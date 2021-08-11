const filesystem = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { env } = require('../../config/database');
const config = require('../../config/database')[env];

const database = {};

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(config.database_url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

filesystem
  .readdirSync(__dirname)
  .filter(
    (file) => file.indexOf('.') !== 0
      && file !== path.basename(__filename)
      && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    database[model.name] = model;
  });

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
