module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      street: DataTypes.STRING,
      number: DataTypes.STRING,
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
    Address.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient',
      onDelete: 'CASCADE',
    });
  };
  return Address;
};
