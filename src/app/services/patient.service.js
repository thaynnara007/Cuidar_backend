const bcrypt = require('bcryptjs');
const { Patient, Address } = require('../models');

const create = (data) => Patient.create(data);

const getByEmail = (email) =>
  Patient.findOne({
    where: {
      email,
    },
  });

const getByCPF = (cpf) =>
  Patient.findOne({
    where: {
      cpf,
    },
  });

const getById = (id) =>
  Patient.findByPk(id, {
    include: [
      {
        model: Address,
        as: 'address',
      },
    ],
  });

module.exports = {
  create,
  getById,
  getByEmail,
  getByCPF,
};
