module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    'Activity',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      pageDescription: DataTypes.TEXT,
      icon: DataTypes.STRING,
    },
    {},
  );
  Activity.associate = (models) => {
    Activity.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'CASCADE',
    });
  };
  return Activity;
};
