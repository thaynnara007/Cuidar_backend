module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      pageDescription: DataTypes.TEXT,
      icon: DataTypes.STRING,
      color: DataTypes.STRING,
      textColor: DataTypes.STRING,
    },
    {},
  );
  Category.associate = (models) => {
    Category.hasMany(models.Activity, {
      foreignKey: 'categoryId',
      as: 'activities',
    });
  };
  return Category;
};
