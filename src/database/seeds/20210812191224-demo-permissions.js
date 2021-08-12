/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const permissions = [
  {
    name: 'create_activity',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { name: 'create_user', createdAt: new Date(), updatedAt: new Date() },
  { name: 'create_patient', createdAt: new Date(), updatedAt: new Date() },
  { name: 'read_patients', createdAt: new Date(), updatedAt: new Date() },
];

module.exports = {
  up: async (queryInterface) => {
    for (const permission of permissions) {
      const existedPermission = await queryInterface.rawSelect(
        'Permissions',
        {
          where: {
            name: permission.name,
          },
        },
        ['id'],
      );

      if (!existedPermission) await queryInterface.bulkInsert('Permissions', [permission], {});
      else console.log(`Papel de nome'${permission.name}}' já existe`);
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'Permissions',
    {
      name: {
        [Op.in]: [
          'create_activity',
          'create_user',
          'create_patient',
          'read_patients',
        ],
      },
    },
    {},
  ),
};
