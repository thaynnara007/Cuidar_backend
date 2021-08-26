module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Addresses', 'patientId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: false,
      references: {
        model: 'Patients',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Addresses', 'patientId'),
};
