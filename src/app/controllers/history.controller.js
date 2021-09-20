const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/history.service');
const activityService = require('../services/activity.service')

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {   
    const { activityId } = req.body
    const patientId = req.logged.loggedAccount.id

    log.info(`Iniciando processo de salvar uma entrada no historico. patientId=${patientId} e activityId=${activityId}`)
    if (!activityId){
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'A atividade deve ser informada.'})
    }

    log.info('Verificando se a atividade existe')
    const activity = await activityService.getJustActivity(activityId);

    if (!activity)
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Atividade não encontrada.'})

    const now = new Date()
    now.setHours(now.getHours() - 3)

    const body = {
      patientId,
      activityId,
      endTime: now,
    }

    log.info('Salvando no histórico')
    const entry = await service.create(body)

    log.info('Finalizando processo.')
    return res.status(StatusCodes.CREATED).json(entry)
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