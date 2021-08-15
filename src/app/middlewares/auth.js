const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const { User } = require('../models');
const config = require('../../config/environment');

const { StatusCodes } = httpStatus;

const verifyAuthorization = (permission) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Acesso negado. Token não fornecido' });
    }

    const [type, token] = authorization.split(' ');

    if (!type || !token || type !== 'Bearer') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Acesso negado. Token Inválido.' });
    }

    const { id, permissions } = jwt.verify(token, config.JWT.secret);

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Usuário não encontrado' });
    }

    if (!permissions.includes(permission)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Seu usuário não tem permissão para executar essa operação.',
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    const errorMsg = 'Token expirado';

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  verifyAuthorization,
};
