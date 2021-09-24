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

const mapData = (history) => {
  const count = history.reduce((accumulator, entry) => {
    const { activity } = entry
    const { category } = activity

    const activityName = activity.name
    const categoryName = category.name

    const categoryObj = accumulator[categoryName]

    if(!categoryObj){
      return {
        ...accumulator,
        [categoryName]: {
          icon: category.icon,
          activities: {
            [activityName]: 1
          }
        }
      }
    }
    else {
      const { activities } = categoryObj
      const value = activities[activityName];

      if(!value){

        return {
          ...accumulator,
          [categoryName]: {
            ...categoryObj,
            activities: {
              ...activities,
              [activityName]: 1
            }
          }
        }
      }
      else {
        return {
          ...accumulator,
          [categoryName]: {
            ...categoryObj,
            activities: {
              ...activities,
              [activityName]: value + 1
            }
          }
        }
      }
    }
  }, {})

  return { result: count }
}

module.exports = {
  create,
  getAll,
  mapData
};
