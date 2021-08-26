module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      passwordHash: {
        type: Sequelize.STRING,
      },
      forgetPasswordCode: {
        type: Sequelize.STRING,
      },
      firstLogin: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  down: (queryInterface) => queryInterface.dropTable('Patients'),
};
