const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/patient.service');
const addressService = require('../services/address.service');
const emailService = require('../services/email.service');
const util = require('../services/util.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { address } = req.body;
    let { patient } = req.body;

    log.info(
      `Inicializando criação do paciente. patient's email = ${patient.email}`,
    );

    if (!patient.email) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O email precisa ser preenchido' });
    }

    if (!patient.cpf) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'O CPF precisa ser preenchido',
      });
    }

    if (!address) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'É necessário preencher as informações de endereço.',
      });
    }

    log.info('Normalizando dados.');

    if (patient.birthday) {
      const birthday = new Date(patient.birthday);

      if (Number.isNaN(birthday.getTime())) {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Formato de data inválida',
        });
      }

      patient = {
        ...patient,
        birthday: new Date(patient.birthday),
      };
    }

    patient.cpf = util.normalizeNumber(patient.cpf);
    patient.password = patient.cpf;

    log.info('Validando se há algum paciente com o mesmo email');

    const patientWithSameEmail = await service.getByEmail(patient.email);

    if (patientWithSameEmail) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Um paciente de mesmo email já existe.' });
    }

    log.info('Validando se há algum paciente com o mesmo CPF.');

    const patientWithSameCPF = await service.getByCPF(patient.cpf);

    if (patientWithSameCPF) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Um paciente de mesmo CPF já existe.' });
    }

    log.info('Criando paciente');
    const newPatient = await service.create(patient);

    log.info(`Criando endereço. patientId = ${newPatient.id}`);
    await addressService.create({ patientId: newPatient.id, ...address });

    log.info(`Buscando paciente por id = ${newPatient.id}`);
    const patientInfo = await service.getById(newPatient.id);

    log.info('Finalizado a criação do paciente.');
    return res.status(StatusCodes.CREATED).json(patientInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca por paciente. patientId = ${id}`);

    const patient = await service.getById(id);

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Paciente não encontrado' });
    }

    log.info('Finalizando busca por paciente.');
    return res.status(StatusCodes.OK).json(patient);
  } catch (error) {
    const errorMsg = 'Erro ao buscar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getByMe = async (req, res) => {
  try {
    const { id } = req.logged.loggedAccount;

    log.info(`Iniciando busca por paciente logado. patientId = ${id}`);

    const patient = await service.getById(id);

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Paciente não encontrado' });
    }

    log.info('Finalizando busca por paciente logado.');
    return res.status(StatusCodes.OK).json(patient);
  } catch (error) {
    const errorMsg = 'Erro ao buscar paciente logado';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { query } = req;

    log.info(`Iniciando listagem dos pacientes, page: ${query.page}`);

    const patients = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(patients);
  } catch (error) {
    const errorMsg = 'Erro ao buscar pacientes';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id, cpf } = req.logged.loggedAccount;
    const { address } = req.body;
    let { patient } = req.body;

    log.info(`Iniciando atualização do paciente. patientId = ${id}`);
    log.info('Normalizando dados.');

    patient.cpf = cpf;

    if (patient.birthday) {
      const birthday = new Date(patient.birthday);

      if (Number.isNaN(birthday.getTime())) {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Formato de data inválida',
        });
      }

      patient = {
        ...patient,
        birthday: new Date(patient.birthday),
      };
    }

    if (patient?.email) {
      log.info(`Validando email. email = ${patient.email}`);

      const patientWithSameEmail = await service.getByEmail(patient.email);

      if (patientWithSameEmail && `${patientWithSameEmail.id}` !== `${id}`) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Um paciente de mesmo email já existe.' });
      }
    }

    if (patient) {
      log.info('Atualizando dados do paciente');
      await service.update(id, patient);

      if (patient.password) service.changePassword(req.logged.loggedAccount, patient.password);
    }

    if (address) {
      log.info('Atualizando dados do endereço');
      await addressService.editByPatient(id, address);
    }

    log.info('Buscando dados atualizados do paciente');
    const patientInfo = await service.getById(id);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(patientInfo);
  } catch (error) {
    const errorMsg = 'Erro ao atualizar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando remoção do paciente. patientId = ${id}`);

    const patient = await service.getJustPacientById(id);

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Paciente não encontrado' });
    }

    await service.delet(patient);

    log.info('Finalizando remoção do paciente.');
    return res.status(StatusCodes.OK).json('Paciente deletado com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro ao apagar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    log.info(
      `Inicializando processo de recuperação de senha. patient email = ${email}`,
    );
    log.info('Buscando usuário por email');

    const patient = await service.getByEmail(email);

    if (patient) {
      const code = util.getRandomNumber();

      log.info('Salvando codigo de recuperação');
      await service.saveForgetPasswordCode(patient.id, code);

      log.info('Enviando codigo por email');
      emailService.sendForgetPasswordEmail(email, code);
    }

    log.info('Finalizando processo de recuperação de senha.');
    return res
      .status(StatusCodes.OK)
      .json(
        'Se seu email tiver sido cadastrado em nossa plataforma, você receberá um email de recuperação de senha.',
      );
  } catch (error) {
    const errorMsg = 'Erro enviar email de recuperação de senha';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getById,
  getByMe,
  getAll,
  edit,
  remove,
  forgetPassword,
};
