const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { Patient, Address } = require('../models');

const create = (data) => Patient.create(data);

const getByEmail = (email) => Patient.findOne({
  where: {
    email,
  },
});

const getByCPF = (cpf) => Patient.findOne({
  where: {
    cpf,
  },
});

const getById = (id) => Patient.findByPk(id, {
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
  const { search } = query;
  let offset = null;
  let patients = null;
  let where = {};

  if (search) {
    where = {
      [Op.or]: [
        {
          name: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          lastName: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          cpf: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          phoneNumber: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          email: {
            [Op.iRegexp]: `${search}`,
          },
        },
      ],
    };
  }

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where,
    };

    patients = await Patient.findAndCountAll(options);

    patients.pages = Math.ceil(patients.count / pageSize);
  } else {
    patients = await Patient.findAll({ where });
  }

  return patients;
};

const update = (id, data) => Patient.update(data, {
  where: {
    id,
  },
});

const changePassword = (patient, newPassword) => {
  const updatedPatient = patient;

  updatedPatient.password = newPassword;
  updatedPatient.forgetPasswordCode = null;
  updatedPatient.firstLogin = false;

  return updatedPatient.save();
};

const saveForgetPasswordCode = async (id, code) => {
  const codeHash = await bcrypt.hash(`${code}`, 5);
  const data = {
    forgetPasswordCode: codeHash,
  };

  await Patient.update(data, {
    where: {
      id,
    },
  });
};

const delet = (patient) => patient.destroy();

module.exports = {
  create,
  getById,
  getByEmail,
  getByCPF,
  getJustPacientById,
  getAll,
  update,
  changePassword,
  saveForgetPasswordCode,
  delet,
};
