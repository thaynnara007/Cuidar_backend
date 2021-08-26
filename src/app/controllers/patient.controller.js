const httpStatus = require('http-status-codes');
const log = require('../services/log.service');

const { StatusCodes } = httpStatus;

const create = async(req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao criar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const getById = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao buscar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const getByMe = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao buscar paciente logado';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const getAll = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao buscar pacientes';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const edit = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao atualizar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const remove = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao apagar paciente';

    log.error(errorMsg, 'app/controllers/patient.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

module.exports ={ 
  create,
  getById,
  getByMe,
  getAll,
  edit,
  remove
}
