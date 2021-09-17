module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Categories', 'textColor', Sequelize.STRING),

  down: (queryInterface) => queryInterface.removeColumn('Categories', 'textColor'),
};
