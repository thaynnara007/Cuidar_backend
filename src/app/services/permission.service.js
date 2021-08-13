const { Permission } = require('../models');

const create = async (data) => Permission.create(data);

const getById = async (id) => Permission.findByPk(id);

const getByName = async (name) => Permission.findOne({
  where: {
    name,
  },
});

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let permissions = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
    };
    permissions = await Permission.findAndCountAll(options);

    permissions.pages = Math.ceil(permissions.count / pageSize);
  } else {
    permissions = await Permission.findAll();
  }

  return permissions;
};

const edit = async (id, data) => Permission.update(data, {
  where: {
    id,
  },
});

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  edit,
};
