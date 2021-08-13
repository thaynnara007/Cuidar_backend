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
    const errorMsg = 'Erro criar permissão';

    log.error(errorMsg, 'app/controllers/user.address.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
};
