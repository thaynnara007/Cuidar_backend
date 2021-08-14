const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/user.service');
const addressService = require('../services/address.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { user, address, permissions } = req.body;

    log.info(`Inicializando criação do usuário. user's email = ${user.email}`);
    log.info('Validando se há algum usuário com o mesmo email');

    const userWithSameEmail = await service.getByEmail(user.email);

    if (userWithSameEmail) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Um usuário com o mesmo email já xiste' });
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

module.exports = {
  create,
};
