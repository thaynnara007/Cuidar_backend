const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/history.service');
const activityService = require('../services/activity.service');
const  { WHO_PATIENT } = require('../util/constants')

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { activityId } = req.body;
    const patientId = req.logged.loggedAccount.id;

    log.info(
      `Iniciando processo de salvar uma entrada no historico. patientId=${patientId} e activityId=${activityId}`,
    );
    if (!activityId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'A atividade deve ser informada.' });
    }

    log.info('Verificando se a atividade existe');
    const activity = await activityService.getJustActivity(activityId);

    if (!activity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Atividade não encontrada.' });
    }

    const now = new Date();
    now.setHours(now.getHours() - 3);

    const body = {
      patientId,
      activityId,
      endTime: now,
    };

    log.info('Salvando no histórico');
    const entry = await service.create(body);

    log.info('Finalizando processo.');
    return res.status(StatusCodes.CREATED).json(entry);
  } catch (error) {
    const errorMsg = 'Erro ao criar uma entrada no histórico';

    log.error(errorMsg, 'app/controllers/history.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { start, end } = req.query;
    const { who } = req.logged

    log.info('Iniciando busca no histórico');
    log.info('Validando entradas');

    if (!start || !end) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'A data inicial e final deve ser informadas',
      });
    }

    const day = new Date(start);
    const day2 = new Date(end);

    if (Number.isNaN(day.getTime())) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Formato de data inválida no parâmetro start',
      });
    }

    if (Number.isNaN(day2.getTime())) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Formato de data inválida no parâmetro end',
      });
    }

    day.setUTCHours(0, 0, 0);
    day2.setUTCHours(23, 59, 59);

    log.info(`Buscando no histórico. data1 = ${day} e data2 = ${day2}`);
    let result = await service.getAll(req.params, day, day2);

    if (who === WHO_PATIENT)
      result = service.mapData(result)

    log.info('Finalizando busca');
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao buscar entradas no histórico';

    log.error(errorMsg, 'app/controllers/history.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getAll,
};
