const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/step.service');
const activityService = require('../services/activity.service');
const firebaseService = require('../services/firebase.service');
const imageService = require('../services/image.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const {
      name, description, number, activityId,
    } = req.body;

    log.info(`Iniciando criação do passo ${name}`);

    if (!name || !description || !number) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: 'Os campo nome, descrição e sequência precisa ser preenchidos',
        });
    }

    if (number < 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: 'O campo sequência precisa ser maior ou igual a zero.',
        });
    }

    if (!activityId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'O passo precisa estar associado a alguma atividade',
      });
    }

    const activity = await activityService.getJustActivity(activityId);

    if (!activity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Atividade não encontrada' });
    }

    log.info(
      'Validando se uma atividade de mesma sequência, para a mesma atividade, já existe',
    );
    const existedStep = await service.getByNumberAndActivity(
      number,
      activityId,
    );

    if (existedStep) {
      return res.status(StatusCodes.CONFLICT).json({
        error:
          'Um passo com o mesmo número de sequência já existe para essa atividade',
      });
    }

    log.info('Criando passo');
    const result = await service.create(req.body);

    log.info('Finalizando criação do passo');
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao criar atividade';

    log.error(errorMsg, 'app/controllers/step.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca pelo passo de id ${id}`);

    const result = await service.getById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Passo não encontrado' });
    }

    log.info('Finalizando busca pelo passo.');
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao buscar passo por id';

    log.error(errorMsg, 'app/controllers/step.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { activityId } = req.params;

    log.info('Iniciando busca pelos passos de uma atividade');
    const result = await service.getAll(req.query, activityId);

    log.info('Finalizando busca pelos passos');
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao buscar passos';

    log.error(errorMsg, 'app/controllers/step.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const addImage = async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;

    log.info(`Iniciando adição de imagem ao passo de id = ${id}`);
    log.info('Buscando o passo');

    const step = await service.getJustStep(id);

    if (!step) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Passo não encontrado' });
    }

    const existedPicture = await imageService.getByStepId(id);

    log.info(`Fazendo upload da imagem. file=${file}`);
    const uploadPicture = await firebaseService.upload(file);

    let picture = null;
    if (!existedPicture) {
      log.info('Criando imagem no banco de dados');
      picture = await imageService.create(id, uploadPicture);
    } else {
      log.info('Atualizando imagem no banco de dados');
      picture = await imageService.edit(id, uploadPicture);
      firebaseService.delet(existedPicture.imageName);
    }

    log.info('Finalizando a adição de imagem');

    const result = {
      ...step.dataValues,
      image: picture.pictureUrl,
    };

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao adicionar imagem';

    log.error(errorMsg, 'app/controllers/step.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, activityId } = req.body;

    log.info(`Iniciando atualização do passo de id ${id}`);

    if (number && number < 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: 'O campo sequência precisa ser maior ou igual a zero.',
        });
    }

    const step = await service.getJustStep(id);

    if (!step) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Passo não encontrado' });
    }

    if (!activityId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'O passo precisa estar associado a alguma atividade',
      });
    }

    const activity = await activityService.getJustActivity(activityId);

    if (!activity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Atividade não encontrada' });
    }

    if (number) {
      log.info(
        'Validando se uma atividade de mesma sequência, para a mesma atividade, já existe',
      );
      const existedStep = await service.getByNumberAndActivity(
        number,
        activityId,
      );

      if (existedStep && `${existedStep.id}` !== id) {
        return res.status(StatusCodes.CONFLICT).json({
          error:
            'Um passo com o mesmo número de sequência já existe para essa atividade',
        });
      }
    }

    log.info('Atualizando passo');
    const result = await service.edit(id, req.body);

    log.info('Finalizando atualização do passo');
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao atualizar atividade';

    log.error(errorMsg, 'app/controllers/step.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando remoção da atividade de id ${id}`);
    log.info('Verificando se a atividade existe');

    const activity = await service.getJustActivity(id);

    if (!activity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Atividade não encontrada' });
    }

    log.info('Removendo atividade');
    await service.remove(activity);

    log.info('Finalizando remoção');
    return res.status(StatusCodes.OK).json('Atividade removida com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro ao remover atividade';

    log.error(errorMsg, 'app/controllers/step.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  addImage,
  edit,
  remove,
};
