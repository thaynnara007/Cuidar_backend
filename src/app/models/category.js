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
    },
    {},
  );
  Category.associate = () => {
    // associations can be defined here
  };
  return Category;
};
