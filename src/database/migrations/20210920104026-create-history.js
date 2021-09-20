module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Histories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    endTime: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    patientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Patients',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    activityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Activities',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Histories'),
};
