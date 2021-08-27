const { Address } = require('../models');

const create = async (addressData) => {
  const address = await Address.create(addressData);

  return address;
};

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let address = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
    };
    address = await Address.findAndCountAll(options);

    address.pages = Math.ceil(address.count / pageSize);
  } else {
    address = await Address.findAll();
  }

  return address;
};

const getByUserId = async (userId) => {
  const address = await Address.findOne({
    where: {
      userId,
    },
  });

  return address;
};

const getByPatientId = async (patientId) => {
  const address = await Address.findOne({
    where: {
      patientId,
    },
  });

  return address;
};

const edit = async (userId, addressData) => {
  await Address.update(addressData, {
    where: {
      userId,
    },
  });

  return getByUserId(userId);
};

const editByPatient = async (patientId, addressData) => {
  await Address.update(addressData, {
    where: {
      patientId,
    },
  });

  return getByPatientId(patientId);
};

const deleteByUserId = async (userId) => {
  const address = await getByUserId(userId);

  if (!address) throw new Error('Nenhum endereço encontrado para esse usuário');

  return address.destroy();
};

module.exports = {
  create,
  getAll,
  getByUserId,
  edit,
  editByPatient,
  deleteByUserId,
};
