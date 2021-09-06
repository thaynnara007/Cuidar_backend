module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define(
    'Step',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      number: DataTypes.INTEGER,
    },
    {},
  );
  Step.associate = (models) => {
    Step.belongsTo(models.Activity, {
      foreignKey: 'activityId',
      as: 'activity',
      onDelete: 'CASCADE',
    });
  };
  return Step;
};
