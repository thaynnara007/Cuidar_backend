const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/history.service');
const activityService = require('../services/activity.service');

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
    const { date, timeSkip } = req.query;

    log.info('Iniciando busca no histórico');
    log.info('Validando entradas');

    if (timeSkip !== 'day' && timeSkip !== 'week' && timeSkip !== 'month') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          'O parâmetro timeSkip precisa ser um dos valores: day, week ou month',
      });
    }

    const day = new Date(date);

    if (Number.isNaN(day.getTime())) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Formato de data inválida no parâmetro date',
      });
    }

    log.info('Definindo datas para o intervalo de busca');

    let date1 = null;
    let date2 = null;

    if (timeSkip === 'day') {
      date1 = new Date(date);
      date2 = new Date(date);
    } else if (timeSkip === 'week') {
      const firstDayWeek = day.getDate() - day.getDay();
      const lastDayWeek = firstDayWeek + 6;

      date1 = new Date(day.setDate(firstDayWeek));
      date2 = new Date(day.setDate(lastDayWeek));
    } else {
      date1 = new Date(day.setDate(1));
      date2 = new Date(day.getFullYear(), day.getMonth() + 1, 0);
    }

    date1.setUTCHours(0, 0, 0);
    date2.setUTCHours(23, 59, 59);

    log.info(`Buscando no histórico. data1 = ${date1} e data2 = ${date2}`);
    const result = await service.getAll(req.params, date1, date2);

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
