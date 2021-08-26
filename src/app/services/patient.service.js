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

const getJustPacientById = (id) => Patient.findByPk(id);

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let patients = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
    };

    patients = await Patient.findAndCountAll(options);

    patients.pages = Math.ceil(patients.count / pageSize);
  } else {
    patients = await Patient.findAll();
  }

  return patients;
};

const update = (id, data) =>
  Patient.update(data, {
    where: {
      id,
    },
  });

const changePassword = (patient, newPassword) => {
  const updatedPatient = patient;

  updatedPatient.password = newPassword;
  updatedPatient.forgetPasswordCode = null;

  return updatedPatient.save();
};

module.exports = {
  create,
  getById,
  getByEmail,
  getByCPF,
  getJustPacientById,
  getAll,
  update,
  changePassword,
};
