/* eslint no-param-reassign: "error" */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/environment');
const { WHO_USER } = require('../util/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING,
      forgetPasswordCode: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password', 'passwordHash', 'forgetPasswordCode'],
        },
      },
    },
  );

  User.associate = (models) => {
    User.hasOne(models.Address, {
      foreignKey: 'userId',
      as: 'address',
    });

    User.belongsToMany(models.Permission, {
      through: 'UserPermissions',
      as: 'permissions',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  User.addHook('beforeSave', async (user) => {
    if (user.password) user.passwordHash = await bcrypt.hash(user.password, 5);

    return user;
  });
  User.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.checkForgetPasswordCode = function checkForgetPasswordCode(
    code,
  ) {
    const validated = this.forgetPasswordCode
      ? bcrypt.compare(code, this.forgetPasswordCode)
      : false;

    return validated;
  };

  User.prototype.generateAuthToken = function generateAuthToken(
    forgetPassword = false,
    permissions,
  ) {
    const { secret, expirationMinutes, expirationLogin } = config.JWT;

    if (forgetPassword) {
      return jwt.sign({ id: this.id, from: WHO_USER }, secret, {
        expiresIn: `${expirationMinutes}m`,
      });
    }

    return jwt.sign(
      {
        id: this.id,
        from: WHO_USER,
        permissions,
      },
      secret,
      {
        expiresIn: `${expirationLogin}h`,
      },
    );
  };

  return User;
};
