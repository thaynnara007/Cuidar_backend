module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    'History',
    {
      endTime: DataTypes.DATE,
    },
    {},
  );
  History.associate = (models) => {
    History.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient',
      onDelete: 'CASCADE',
    });
    History.belongsTo(models.Activity, {
      foreignKey: 'activityId',
      as: 'activity',
      onDelete: 'CASCADE',
    });
  };
  return History;
};
