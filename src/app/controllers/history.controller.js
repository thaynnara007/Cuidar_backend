const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/history.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao criar uma entrada no histórico';

    log.error(
      errorMsg,
      'app/controllers/history.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const getAll = async (req, res) => {
  try {
    
  } catch (error) {
    const errorMsg = 'Erro ao buscar entradas no histórico';

    log.error(
      errorMsg,
      'app/controllers/history.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

module.exports = {
  create,
  getAll,
}