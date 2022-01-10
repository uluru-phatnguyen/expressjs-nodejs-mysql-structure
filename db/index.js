const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { dbConfig } = require('./../config/index');
const { applyExtraSetup } = require('./extra-setup');
const basename = path.basename(__filename);

const sequelize = new Sequelize(dbConfig?.database, dbConfig?.username, dbConfig?.password, {
  host: dbConfig?.host,
  dialect: dbConfig?.dialect,
  dialectOptions: dbConfig?.dialectOptions,
  logQueryParameters: dbConfig?.logQueryParameters ?? false,
  // pool: {
  //   max: process.env.MYSQL_POOL_MAX || 5,
  //   min: process.env.MYSQL_POOL_MIN || 0,
  //   acquire: process.env.MYSQL_POOL_ACQUIRE || 30000,
  //   idle: process.env.MYSQL_POOL_IDLE || 10000,
  // },
});

const modelDefiners = [
  // require('./models/user.model'),
];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, '/models/', file));
    modelDefiners.push(model);
  });

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = {
  sequelize,
  Sequelize: sequelize.Sequelize
};
