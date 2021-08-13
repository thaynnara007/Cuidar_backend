module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Permissions',
    'description',
    Sequelize.TEXT,
  ),

  down: (queryInterface) => queryInterface.removeColumn('Permissions', 'description'),
};
