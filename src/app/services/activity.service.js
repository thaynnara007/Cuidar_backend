const { Op } = require('sequelize');
const { Activity, Step } = require('../models');

const create = (data) => Activity.create(data);

const getByNameAndCategory = (name, categoryId) => Activity.findOne({
  where: {
    name: {
      [Op.iLike]: name,
    },
    categoryId,
  },
});

const getById = (id) => Activity.findByPk(id, {
  include: {
    model: Step,
    as: 'steps',
  },
});

const getJustActivity = (id) => Activity.findByPk(id);

const getAll = async (query, categoryId) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let activities = null;
  const where = {
    categoryId,
  };

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where,
    };
    activities = await Activity.findAndCountAll(options);

    activities.pages = Math.ceil(activities.count / pageSize);
  } else {
    activities = await Activity.findAll({ where });
  }

  return activities;
};

const edit = async (id, data) => {
  await Activity.update(data, {
    where: {
      id,
    },
  });

  return getById(id);
};

const remove = async (activity) => activity.destroy();

module.exports = {
  create,
  getByNameAndCategory,
  getById,
  getJustActivity,
  getAll,
  edit,
  remove,
};
