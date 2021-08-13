module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    'Permission',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      descrription: DataTypes.STRING,
    },
    {},
  );
  Permission.associate = (models) => {
    Permission.belongsToMany(models.User, {
      through: 'UserPermissions',
      as: 'users',
      foreignKey: 'permissionId',
      onDelete: 'CASCADE',
    });
  };

  return Permission;
};
