const {
  Category, Activity, Step, Image,
} = require('../models');

const create = (data) => Step.create(data);

const getByNumberAndActivity = (number, activityId) => Step.findOne({
  where: {
    number,
    activityId,
  },
});

const getById = (id) => Step.findByPk(id, {
  include: [
    {
      model: Image,
      as: 'image',
      separete: true,
    },
    {
      model: Activity,
      as: 'activity',
      include: [
        {
          model: Category,
          as: 'category',
        },
        {
          model: Step,
          as: 'steps',
          separete: true,
        },
      ],
    },
  ],
});

const getJustStep = (id) => Step.findByPk(id);

const getAll = async (query, activityId) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let steps = null;
  const where = {
    activityId,
  };
  let include = []

  if (query.includeImages === 'true'){
    include.push(
      {
        model: Image,
        as: 'image',
        separete: true,
      }
    )
  }

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where,
      include,
    };
    steps = await Step.findAndCountAll(options);

    steps.pages = Math.ceil(steps.count / pageSize);
  } else {
    steps = await Step.findAll({ where, include });
  }

  return steps;
};

const edit = async (id, data) => {
  await Step.update(data, {
    where: {
      id,
    },
  });

  return getById(id);
};

const remove = async (step) => step.destroy();

module.exports = {
  create,
  getByNumberAndActivity,
  getById,
  getJustStep,
  getAll,
  edit,
  remove,
};
