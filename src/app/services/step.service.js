const { Activity, Step } = require('../models');

const create = (data) => Step.create(data);

const getByNumberAndActivity = (number, activityId) => Step.findOne({
  where: {
    number,
    activityId,
  },
});

const getById = (id) => Activity.findByPk(id, {
  include: {
    model: Step,
    as: 'steps',
  },
});

const getJustStep = (id) => Step.findByPk(id);

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let activities = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
    };
    activities = await Activity.findAndCountAll(options);

    activities.pages = Math.ceil(activities.count / pageSize);
  } else {
    activities = await Activity.findAll();
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
  getByNumberAndActivity,
  getById,
  getJustStep,
  getAll,
  edit,
  remove,
};
