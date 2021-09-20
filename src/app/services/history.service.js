const { Op } = require('sequelize');
const { History, Category, Activity } = require('../models');

const create = (data) => History.create(data);

const getAll = ({ patientId }, date1, date2) => {
  const query = {
    where: {
      patientId,
      endTime: {
        [Op.between]: [date1, date2],
      },
    },
    include: [
      {
        model: Activity,
        as: 'activity',
        include: {
          model: Category,
          as: 'category',
        },
      },
    ],
  };

  return History.findAll(query);
};

module.exports = {
  create,
  getAll,
};
