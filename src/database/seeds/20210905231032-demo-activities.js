/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const activities = [
  {
    name: 'Sólidas',
    description: 'Atividade responsável por estímulos motores e sensoriais.',
    pageDescription:
      'Aqui você irá praticar estímulos motores, sensoriais e também corporais.',
    icon: 'APPLE',
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Pastosas',
    description: 'Atividade responsável por estímulos motores e sensoriais.',
    pageDescription:
      'Esta atividade é responsável por estímulos motores, sensoriais e também corporais.',
    icon: 'SOUP',
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Líquidas',
    description:
      'Atividade responsável por estímulos motores e sensoriais e corporais.',
    pageDescription:
      'Esta atividade é responsável por estímulos motores, sensoriais e também corporais.',
    icon: 'DRINK',
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Corpo',
    description:
      'Atividade responsável por estímulos motores e sensoriais e corporais.',
    pageDescription:
      'Nesta atividade será trabalhado os estímulos motores, sensoriais, como também tatéis!',
    icon: 'BODY',
    categoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Dentes',
    description:
      'Atividade responsável por estímulos motores e sensoriais e corporais.',
    pageDescription:
      'Nesta atividade será trabalhado os estímulos motores, sensoriais, como também tatéis!',
    icon: 'TOOTH',
    categoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Blusas',
    description:
      'Atividade responsável por estímulos motores e sensoriais e corporais.',
    pageDescription:
      'Esta atividade fica responsável por estímulos motores, sensoriais e também tatéis!',
    icon: 'SHIRT',
    categoryId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Calças',
    description:
      'Atividade responsável por estímulos motores e sensoriais e corporais.',
    pageDescription:
      'Esta atividade fica responsável por estímulos motores, sensoriais e também tatéis!',
    icon: 'PANTS',
    categoryId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const activity of activities) {
      const existedActivity = await queryInterface.rawSelect(
        'Activities',
        {
          where: {
            name: activity.name,
          },
        },
        ['id'],
      );

      if (!existedActivity || existedActivity.length === 0) await queryInterface.bulkInsert('Activities', [activity], {});
      else console.log(`Atividade com o nome '${activity.name}' já existe`);
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'Categories',
    {
      name: {
        [Op.in]: [
          'Sólidas',
          'Pastosas',
          'Líquidas',
          'Corpo',
          'Dentes',
          'Blusas',
          'Calças',
        ],
      },
    },
    {},
  ),
};
