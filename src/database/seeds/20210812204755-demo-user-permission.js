/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const permissions = [
  {
    userId: 1,
    permissionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    permissionId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    permissionId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    permissionId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    permissionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    permissionId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    permissionId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 3,
    permissionId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const permission of permissions) {
      const existedPermission = await queryInterface.rawSelect(
        'UserPermissions',
        {
          where: {
            userId: permission.userId,
            permissionId: permission.permissionId,
          },
        },
        ['id'],
      );

      if (!existedPermission) await queryInterface.bulkInsert('UserPermissions', [permission], {});
      else {
        console.log(
          `O usuário de id${permission.userId}}' já tem a permissão de id ${permission.permissionId} `,
        );
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'UserPermissions',
    {
      [Op.or]: [
        {
          userId: 1,
          permissionId: {
            [Op.in]: [1, 2, 3, 4],
          },
        },
        {
          userId: 2,
          permissionId: {
            [Op.in]: [1, 3, 4],
          },
        },
        { userId: 3, permissionId: 3 },
      ],
    },
    {},
  ),
};
