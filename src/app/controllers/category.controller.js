const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/category.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { name, description } = req.body

    log.info(`Iniciando criação da categoria ${name}`)

    if (!name || !description) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ error: "Os campos nome e descrição precisam ser preenchidos"})
    }

    log.info(`Validando se uma categoria de mesmo noma já existe`)
    const existedCategory = await service.getByName(name)

    if (existedCategory){
      return res.status(StatusCodes.CONFLICT)
        .json({ error: "Uma categoria de mesmo nome já existe"})
    }

    log.info(`Criando categoria`)
    const result = await service.create(req.body)

    log.info(`Finalizando criação da categoria`)
    return res.status(StatusCodes.CREATED).json(result)
    
  } catch (error) {
    const errorMsg = 'Erro ao criar categoria';

    log.error(
      errorMsg,
      'app/controllers/category.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const getById = async(req, res) => {
  try {
    const { id } = req.params

    log.info(`Iniciando busca pela categoria de id ${id}`)

    const result = await service.getById(id)

    if (!result){
      return res.status(StatusCodes.NOT_FOUND)
        .json({ error: 'Categoria não encontrada'})
    }

    log.info(`Finalizando busca pela categoria.`)
    return res.status(StatusCodes.OK).json(result)

  } catch (error) {
    const errorMsg = 'Erro ao buscar categoria por id';

    log.error(
      errorMsg,
      'app/controllers/category.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
}

const  getAll = async(req, res) => {}

const edit = async(req, res) => {}

const remove = async(req, res) => {}

module.exports = {
  create,
  getById,
  getAll,
  edit,
  remove
}