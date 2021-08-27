const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const userService = require('../services/user.service');
const patientService = require('../services/patient.service');
const config = require('../../config/environment');
const { WHO_PATIENT, WHO_USER } = require('../util/constants');

const { StatusCodes } = httpStatus;

const verifyAuthorization = (who, permission) => async (req, res, next) => {
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

    const {
      id, from, email, permissions,
    } = jwt.verify(
      token,
      config.JWT.secret,
    );

    const user = await userService.getJustUserById(id);
    const patient = await patientService.getJustPacientById(id);

    if (who === WHO_USER) {
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Usuário não encontrado' });
      }

      if (user.email !== email) {
        return res.status(StatusCodes.LOCKED).json({ error: 'Não permitido.' });
      }

      if (permission && !permissions?.includes(permission)) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: 'Seu usuário não tem permissão para executar essa operação.',
        });
      }

      req.user = user;
    } else if (who === WHO_PATIENT) {
      if (!patient) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Paciente não encontrado' });
      }

      if (patient.email !== email) {
        return res.status(StatusCodes.LOCKED).json({ error: 'Não permitido.' });
      }

      req.patient = patient;
    } else {
      const foundAccount = from === 'user' ? user : patient;

      if (!foundAccount) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Conta não encontrada' });
      }

      if (foundAccount.email !== email) {
        return res.status(StatusCodes.LOCKED).json({ error: 'Não permitido.' });
      }

      req.logged = {
        loggedPerson: foundAccount,
        who: from,
      };
    }

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
