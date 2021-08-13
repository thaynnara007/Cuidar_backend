const { Permission } = require('../models');

const create = async (data) => Permission.create(data);

const getByName = async (name) => Permission.findOne({
  where: {
    name,
  },
});

module.exports = {
  create,
  getByName,
};
