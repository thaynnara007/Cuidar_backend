module.exports = (sequelize) => {
  const UserPermission = sequelize.define('UserPermission', {}, {});

  UserPermission.associate = (models) => {
    UserPermission.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserPermission.belongsTo(models.Permission, {
      foreignKey: 'permissionId',
      as: 'permission',
    });
  };
  return UserPermission;
};
