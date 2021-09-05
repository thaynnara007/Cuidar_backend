/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const categories = [
  {
    name: 'Refeições',
    description: 'Aqui você encontra alimentos sólidos, líquidos e pastosos.',
    pageDescription: 'Aqui você pode escolher qual o alimento será utilizado!',
    icon: 'PLATE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Higiene',
    description: 'Você pode escolher entre a higiene do corpo ou dos dentes.',
    pageDescription: 'Aqui você pode escolher qual parte será higienizada!',
    icon: 'HYGIENE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Roupas',
    description: 'Escolha qual das peças de roupa vamos praticar hoje!',
    pageDescription:
      'Aqui você pode escolher qual peça de roupa será utilizada',
    icon: 'HANGER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const category of categories) {
      const existedCategory = await queryInterface.rawSelect(
        'Categories',
        {
          where: {
            name: category.name,
          },
        },
        ['id'],
      );

      if (!existedCategory || existedCategory.length === 0) await queryInterface.bulkInsert('Categories', [category], {});
      else console.log(`Categoria com o nome '${category.name}' já existe`);
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'Categories',
    {
      name: {
        [Op.in]: ['Refeições', 'Higiene', 'Roupas'],
      },
    },
    {},
  ),
};
