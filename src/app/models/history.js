module.exports = (sequelize) => {
  const History = sequelize.define('History', {}, {});
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
