const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/permission.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { body } = req;
    const { name } = body;

    log.info(`Iniciando criação da permissão '${name}'`);
    log.info('Verificando se há uma permisão de mesmo nome.');

    const existedPermission = await service.getByName(name);

    if (existedPermission) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Já existe uma permissão de mesmo nome.' });
    }

    log.info('Criando permissão.');
    const permission = await service.create(body);

    log.info('Permissão criada com sucesso.');
    return res.status(StatusCodes.CREATED).json(permission);
  } catch (error) {
    const errorMsg = 'Erro ao criar permissão';

    log.error(
      errorMsg,
      'app/controllers/permission.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { query } = req;

    log.info(`Iniciando listagem das permissões, page: ${query.page}`);

    const permissions = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(permissions);
  } catch (error) {
    const errorMsg = 'Erro ao buscar permissões';

    log.error(
      errorMsg,
      'app/controllers/permission.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    log.info(`Iniciando edição da permissão de id ${id}`);

    const [updated] = await service.edit(id, body);

    if (!updated) return res.status(StatusCodes.NOT_FOUND).json('Permissão não encontrada');

    log.info('Buscando permissão atualizada');
    const permission = await service.getById(id);

    log.info('Atulização finalizada com sucesso.');
    return res.status(StatusCodes.OK).json(permission);
  } catch (error) {
    const errorMsg = 'Erro ao editar permissão';

    log.error(
      errorMsg,
      'app/controllers/permission.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getAll,
  edit,
};
