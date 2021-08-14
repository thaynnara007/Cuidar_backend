const {
  User, Permission, UserPermission, Address,
} = require('../models');
const log = require('./log.service');

const create = (data) => User.create(data);

const getByEmail = (email) => User.findOne({
  where: {
    email,
  },
});

const getById = (id) => User.findByPk(id, {
  include: [
    {
      model: Permission,
      as: 'permissions',
    },
    {
      model: Address,
      as: 'address',
    },
  ],
});

const updatePermissions = (userId, permissions) => Promise.all(
  permissions.map(async (permissionId) => {
    const data = { userId, permissionId };

    const existedPermission = await Permission.findOne({
      where: {
        id: permissionId,
      },
    });

    if (!existedPermission) {
      log.warn(
        `A permissão de id '${permissionId}' não foi encontrada e não foi relacionada ao usuario de id '${userId}'`,
      );
    }

    const relationship = await UserPermission.findOne({
      where: {
        ...data,
      },
    });

    if (relationship) await relationship.destroy();
    else await UserPermission.create(data);
  }),
);

module.exports = {
  create,
  getByEmail,
  getById,
  updatePermissions,
};
