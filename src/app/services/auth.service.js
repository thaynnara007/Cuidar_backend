const { User, Patient, Permission } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: {
      include: 'passwordHash',
    },
    include: [
      {
        model: Permission,
        as: 'permissions',
      },
    ],
  });

  if (!user) return null;

  const { permissions } = user.dataValues;
  const permissionsNames = permissions.map((permission) => permission.name);

  const validPassword = await user.checkPassword(password);

  if (!validPassword) return null;

  delete user.dataValues.passwordHash;

  return {
    token: user.generateAuthToken(false, permissionsNames),
    user,
  };
};

const loginPatient = async (email, password) => {
  const patient = await Patient.findOne({
    where: {
      email,
    },
    attributes: {
      include: 'passwordHash',
    },
  });

  if (!patient) return null;

  const validPassword = await patient.checkPassword(password);

  if (!validPassword) return null;

  delete patient.dataValues.passwordHash;

  return {
    token: patient.generateAuthToken(false),
    patient,
  };
};

const verifyForgetPasswordCode = async (email, code) => {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: {
      include: 'forgetPasswordCode',
    },
  });

  if (!user) return null;

  const validCode = await user.checkForgetPasswordCode(code);

  if (!validCode) return null;

  return {
    token: user.generateAuthToken(true),
  };
};

module.exports = {
  login,
  loginPatient,
  verifyForgetPasswordCode,
};
