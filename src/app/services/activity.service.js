const { Op } = require('sequelize');
const {
  Category, Activity, Step, Image,
} = require('../models');

const create = (data) => Activity.create(data);

const getByNameAndCategory = (name, categoryId) => Activity.findOne({
  where: {
    name: {
      [Op.iLike]: name,
    },
    categoryId,
  },
});

const getById = (id, includeSteps = true, includeImages = false) => {
  const include = [
    {
      model: Category,
      as: 'category',
    },
  ];

  if (includeSteps !== 'false') {
    if (includeImages === 'true') {
      include.push({
        model: Step,
        as: 'steps',
        include: {
          model: Image,
          as: 'image',
        },
      });
    } else {
      include.push({
        model: Step,
        as: 'steps',
      });
    }
  }

  return Activity.findByPk(id, {
    include,
  });
};

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
