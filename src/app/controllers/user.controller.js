const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/user.service');
const addressService = require('../services/address.service');
const emailService = require('../services/email.service');
const util = require('../services/util.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { user, address, permissions } = req.body;

    if (!user.email) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O email precisa ser preenchido' });
    }

    if (!user.phoneNumber) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'O número de telefone precisa ser preenchido',
      });
    }

    if (!user.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'A senha precisa ser preenchido' });
    }

    log.info(`Inicializando criação do usuário. user's email = ${user.email}`);
    log.info('Validando se há algum usuário com o mesmo email');

    const userWithSameEmail = await service.getByEmail(user.email);

    if (userWithSameEmail) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Um usuário de mesmo email já existe.' });
    }

    log.info('Criando usuário');
    const newUser = await service.create(user);

    log.info(`Criando endereço. userId = ${newUser.id}`);
    await addressService.create({ userId: newUser.id, ...address });

    log.info('Atualizando as permissões do usuário');
    await service.updatePermissions(newUser.id, permissions);

    log.info(`Buscando usuário por id = ${newUser.id}`);
    const userInfo = await service.getById(newUser.id);

    log.info('Finalizado a criação de usuário.');
    return res.status(StatusCodes.CREATED).json(userInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca por usuário. userId = ${id}`);

    const user = await service.getById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Usuário não encontrado' });
    }

    log.info(`Finalizando busca por usuário. userId = ${id}`);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    const errorMsg = 'Erro buscar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getByMe = async (req, res) => {
  try {
    const { id } = req.user;

    log.info(`Iniciando busca por usuário logado. userId = ${id}`);

    const user = await service.getById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Usuário não encontrado' });
    }

    delete user.dataValues.permissions;

    log.info(`Finalizando busca por usuário logado. userId = ${id}`);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    const errorMsg = 'Erro buscar usuário logado';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { query } = req;

    log.info(`Iniciando listagem dos usuarios, page: ${query.page}`);

    const users = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    const errorMsg = 'Erro buscar usuários';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, address, permissions } = req.body;

    log.info(`Iniciando atualização do usuário. userId = ${id}`);
    log.info('Verificando se usuário existe');

    const existedUser = await service.getJustUserById(id);

    if (!existedUser) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Usuário não encontrado' });
    }

    if (user?.email) {
      log.info(`Validando email. email = ${user.email}`);

      const userWithSameEmail = await service.getByEmail(user.email);

      if (userWithSameEmail && `${userWithSameEmail.id}` !== `${id}`) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Um usuário de mesmo email já existe.' });
      }
    }

    if (user) {
      log.info('Atualizando dados do usuário');
      await service.updateUser(id, user);
    }

    if (address) {
      log.info('Atualizando dados do endereço');
      await addressService.edit(id, address);
    }

    if (permissions) {
      log.info('Atualizando permissões');
      await service.updatePermissions(id, permissions);
    }

    log.info('Buscando dados atualizados do usuário');
    const userInfo = await service.getById(id);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(userInfo);
  } catch (error) {
    const errorMsg = 'Erro atualizar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const editMe = async (req, res) => {
  try {
    const { id } = req.user;
    const { user, address } = req.body;

    log.info(`Iniciando atualização do usuário logado. userId = ${id}`);
    log.info('Verificando se usuário existe');

    if (user?.email) {
      log.info(`Validando email. email = ${user.email}`);

      const userWithSameEmail = await service.getByEmail(user.email);

      if (userWithSameEmail && `${userWithSameEmail.id}` !== `${id}`) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Esse email já foi cadastrado.' });
      }
    }

    if (user) {
      log.info('Atualizando dados do usuário');
      await service.updateUser(id, user);

      if (user.password) service.changePassword(req.user, user.password);
    }

    if (address) {
      log.info('Atualizando dados do endereço');
      await addressService.edit(id, address);
    }

    log.info('Buscando dados atualizados do usuário');
    const userInfo = await service.getById(id);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(userInfo);
  } catch (error) {
    const errorMsg = 'Erro atualizar usuário logado.';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const delet = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando remoção de usuário. userId = ${id}`);

    const user = await service.getJustUserById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Usuário não encontrado' });
    }

    await service.delet(user);

    log.info('Finalizando remoção de usuário.');
    return res.status(StatusCodes.OK).json('Usuário deletado com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro deletar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    log.info(
      `Inicializando processo de recuperação de senha. user email = ${email}`
    );
    log.info('Buscando usuário por email');

    const user = await service.getByEmail(email);

    if (user) {
      const code = util.getRandomNumber();

      log.info('Salvando codigo de recuperação');
      await service.saveForgetPasswordCode(user.id, code);

      log.info('Enviando codigo por email');
      emailService.sendForgetPasswordEmail(email, code);
    }

    log.info('Finalizando processo de recuperação de senha.');
    return res
      .status(StatusCodes.OK)
      .json(
        'Se seu email tiver sido cadastrado em nossa plataforma, você receberá um email de recuperação de senha.'
      );
  } catch (error) {
    const errorMsg = 'Erro enviar email de recuperação de senha';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const changePassword = async (req, res) => {
  try {
    const { user } = req;
    const { newPassword } = req.body;

    log.info(`Iniciando atualização de senha. userEmail=${user.email}`);

    await service.changePassword(user, newPassword);

    log.info('Senha atualizada');
    return res.status(StatusCodes.OK).json('Senha atualizada');
  } catch (error) {
    const errorMsg = 'Erro ao mudar senha.';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  getByMe,
  edit,
  editMe,
  forgetPassword,
  changePassword,
  delet,
};
