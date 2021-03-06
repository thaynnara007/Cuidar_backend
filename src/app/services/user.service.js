const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
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

const getJustUserById = (id) => User.findByPk(id);

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let users = null;
  const { search } = query;
  const include = [
    {
      model: Address,
      as: 'address',
    },
    {
      model: Permission,
      as: 'permissions',
    },
  ];

  let where = {};

  if (search) {
    where = {
      [Op.or]: [
        {
          name: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          lastName: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          phoneNumber: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          email: {
            [Op.iRegexp]: `${search}`,
          },
        },
      ],
    };
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
    users = await User.findAndCountAll(options);

    users.pages = Math.ceil(users.count / pageSize);
  } else {
    users = await User.findAll({ where, include });
  }

  return users;
};

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
        `A permiss??o de id '${permissionId}' n??o foi encontrada e n??o foi relacionada ao usuario de id '${userId}'`,
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

const updateUser = (id, data) => User.update(data, {
  where: {
    id,
  },
});

const saveForgetPasswordCode = async (id, code) => {
  const codeHash = await bcrypt.hash(`${code}`, 5);
  const userData = {
    forgetPasswordCode: codeHash,
  };

  await User.update(userData, {
    where: {
      id,
    },
  });
};

const changePassword = (user, newPassword) => {
  const updatedUser = user;

  updatedUser.password = newPassword;
  updatedUser.forgetPasswordCode = null;

  return updatedUser.save();
};

const delet = (user) => user.destroy();

module.exports = {
  create,
  getByEmail,
  getById,
  getAll,
  getJustUserById,
  updatePermissions,
  updateUser,
  saveForgetPasswordCode,
  changePassword,
  delet,
};
