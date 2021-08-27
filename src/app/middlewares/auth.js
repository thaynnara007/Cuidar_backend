const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const userService = require('../services/user.service');
const patientService = require('../services/patient.service');
const config = require('../../config/environment');
const { WHO_PATIENT, WHO_USER } = require('../util/constants');

const { StatusCodes } = httpStatus;

const verifyAuthorization = (expectUser, permission) => async (req, res, next) => {
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

    const { id, from, permissions } = jwt.verify(token, config.JWT.secret);

    if (expectUser && from !== expectUser) {
      return res
        .status(StatusCodes.LOCKED)
        .json({ error: 'Não permitido ao seu tipo de usuário.' });
    }

    if (expectUser === WHO_USER) {
      if (permission && !permissions?.includes(permission)) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: 'Seu usuário não tem permissão para executar essa operação.',
        });
      }
    }

    let loggedAccount = null;

    if (from === WHO_USER) loggedAccount = await userService.getJustUserById(id);
    else if (from === WHO_PATIENT) loggedAccount = await patientService.getJustPacientById(id);

    if (!loggedAccount) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Conta não encontrada' });
    }

    req.logged = {
      loggedAccount,
      who: from,
    };

    return next();
  } catch (error) {
    const errorMsg = 'Token expirado';

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg}, ${error.message}` });
  }
};

module.exports = {
  verifyAuthorization,
};
