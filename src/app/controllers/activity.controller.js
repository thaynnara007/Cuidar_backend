const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/activity.service');
const categoryService = require('../services/category.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    log.info(`Iniciando criação da atividade ${name}`);

    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O campo nome precisa ser preenchidos' });
    }

    if (!categoryId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'A atividade precisa estar associada a alguma categoria',
      });
    }

    const category = await categoryService.getJustCategory(categoryId);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Categoria não encontrada' });
    }

    log.info(
      'Validando se uma atividade de mesmo nome, para a mesma categoria, já existe',
    );
    const existedActivity = await service.getByNameAndCategory(
      name,
      categoryId,
    );

    if (existedActivity) {
      return res.status(StatusCodes.CONFLICT).json({
        error: 'Uma atividade de mesmo nome já existe nessa categoria',
      });
    }

    log.info('Criando atividade');
    const result = await service.create(req.body);

    log.info('Finalizando criação da atividade');
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao criar atividade';

    log.error(
      errorMsg,
      'app/controllers/activity.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca pela atividade de id ${id}`);

    const result = await service.getById(id);

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Atividade não encontrada' });
    }

    log.info('Finalizando busca pela atividade.');
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao buscar atividade por id';

    log.error(
      errorMsg,
      'app/controllers/activity.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { categoryId } = req.params;

    log.info('Iniciando busca pelas atividades');
    log.info('Validando se categoria existe');

    const category = await categoryService.getJustCategory(categoryId);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Categoria não encontrada' });
    }

    log.info('Buscando pelas atividades');
    const result = await service.getAll(req.query, categoryId);

    log.info('Finalizando busca pelas atividades');
    return res.status(StatusCodes.OK).json({ category, ...result });
  } catch (error) {
    const errorMsg = 'Erro ao buscar atividades';

    log.error(
      errorMsg,
      'app/controllers/activity.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    log.info(`Iniciando atualizanção da atividade de id ${id}`);
    log.info('Verificando se a atividade existe');

    const activity = await service.getJustActivity(id);

    if (!activity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'atividade não encontrada' });
    }

    if (categoryId) {
      const category = await categoryService.getJustCategory(categoryId);

      if (!category) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Categoria não encontrada' });
      }
    }

    if (name) {
      log.info(
        'Validando se uma atividade de mesmo nome já existe na mesma categoria',
      );

      const searchedCategoryId = categoryId ?? activity.categoryId;
      const existedActivity = await service.getByNameAndCategory(
        name,
        searchedCategoryId,
      );

      if (existedActivity && `${existedActivity.id}` !== id) {
        return res.status(StatusCodes.CONFLICT).json({
          error: 'Uma atividade mesmo nome já existe nessa categoria',
        });
      }
    }

    log.info('Atualizando atividade');
    const result = await service.edit(id, req.body);

    log.info('Finalizando atualização da atividade');
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao atualizar atividade';

    log.error(
      errorMsg,
      'app/controllers/activity.controller.js',
      error.message,
    );

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

    log.error(
      errorMsg,
      'app/controllers/activity.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  remove,
};
