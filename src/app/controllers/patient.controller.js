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
      `Inicializando criação do paciente. patient's email = ${patient.email}`
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

    log.info(`Normalizando dados.`);

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

    log.info(`Finalizando busca por paciente.`);
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
    const { id } = req.patient;

    log.info(`Iniciando busca por paciente logado. patientId = ${id}`);

    const patient = await service.getById(id);

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Paciente não encontrado' });
    }

    log.info(`Finalizando busca por paciente logado.`);
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
  } catch (error) {
    const errorMsg = 'Erro ao apagar paciente';

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
};
