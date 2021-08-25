/* eslint no-param-reassign: "error" */

const bcrypt = require('bcryptjs');

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
      firstLogin: DataTypes.BOOLEAN,
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
  return Patient;
};