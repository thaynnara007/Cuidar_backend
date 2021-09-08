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
    log.info('Iniciando busca pelas atividades');
    const result = await service.getAll(req.query);

    log.info('Finalizando busca pelas atividades');
    return res.status(StatusCodes.OK).json(result);
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
    const { name } = req.body;

    log.info(`Iniciando atualizanção da categoria de id ${id}`);
    log.info('Verificando se a categoria existe');

    const category = await service.getJustCategory(id);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Categoria não encontrada' });
    }

    if (name) {
      log.info('Validando se uma categoria de mesmo nome já existe');
      const existedCategory = await service.getByName(name);

      if (existedCategory && `${existedCategory.id}` !== id) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Uma categoria de mesmo nome já existe' });
      }
    }

    log.info('Atualizando categoria');
    const result = await service.edit(id, req.body);

    log.info('Finalizando atualização da categoria');
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMsg = 'Erro ao atualizar categoria';

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

    log.info(`Iniciando remoção da categoria de id ${id}`);
    log.info('Verificando se a categoria existe');

    const category = await service.getJustCategory(id);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Categoria não encontrada' });
    }

    log.info('Removendo categoria');
    await service.remove(category);

    log.info('Finalizando remoção');
    return res.status(StatusCodes.OK).json('Categoria removida com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro ao remover categoria';

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
