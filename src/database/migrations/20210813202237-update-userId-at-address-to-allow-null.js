module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Addresses', 'userId', {
    type: Sequelize.INTEGER,
    allowNull: true,
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Addresses', 'userId', {
    type: Sequelize.INTEGER,
    allowNull: false,
  }),
};
