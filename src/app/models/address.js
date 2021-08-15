module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      district: DataTypes.STRING,
      complement: DataTypes.TEXT,
      zipCode: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {},
  );
  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return Address;
};
