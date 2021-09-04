/* eslint no-param-reassign: "error" */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/environment');
const { WHO_PATIENT } = require('../util/constants');

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      cpfFormatted: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.cpf?.replace(
            /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
            '$1.$2.$3-$4',
          );
        },
      },
      birthday: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING,
      forgetPasswordCode: DataTypes.STRING,
      firstLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password', 'passwordHash', 'forgetPasswordCode'],
        },
      },
    },
  );

  Patient.associate = (models) => {
    Patient.hasOne(models.Address, {
      foreignKey: 'patientId',
      as: 'address',
    });
  };

  Patient.addHook('beforeSave', async (patient) => {
    if (patient.password) patient.passwordHash = await bcrypt.hash(patient.password, 5);

    return patient;
  });
  Patient.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  Patient.prototype.checkForgetPasswordCode = function checkForgetPasswordCode(
    code,
  ) {
    const validated = this.forgetPasswordCode
      ? bcrypt.compare(code, this.forgetPasswordCode)
      : false;

    return validated;
  };

  Patient.prototype.generateAuthToken = function generateAuthToken(
    forgetPassword = false,
  ) {
    const { secret, expirationMinutes } = config.JWT;

    if (forgetPassword) {
      return jwt.sign({ id: this.id, from: WHO_PATIENT }, secret, {
        expiresIn: `${expirationMinutes}m`,
      });
    }

    return jwt.sign({ id: this.id, from: WHO_PATIENT }, secret);
  };

  return Patient;
};
