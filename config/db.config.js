module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || 'root',
    database: process.env.DEV_DB_NAME || 'kairos',
    host: process.env.DEV_DB_HOSTNAME || '127.0.0.1',
    port: process.env.DEV_DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    logQueryParameters: (process.env.SEQUELIZE_LOGGING === 'true') ? true : false,
    migrationStorage: 'sequelize',
  },
  test: {
    username: process.env.CI_DB_USERNAME || 'root',
    password: process.env.CI_DB_PASSWORD || 'root',
    database: process.env.CI_DB_NAME || 'kairos_test',
    host: process.env.CI_DB_HOSTNAME || '127.0.0.1',
    port: process.env.CI_DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    logQueryParameters: (process.env.SEQUELIZE_LOGGING === 'true') ? true : false,
    migrationStorage: 'sequelize',
  },
  production: {
    username: process.env.PROD_DB_USERNAME || 'root',
    password: process.env.PROD_DB_PASSWORD || 'root',
    database: process.env.PROD_DB_NAME || 'kairos_prod',
    host: process.env.PROD_DB_HOSTNAME || '127.0.0.1',
    port: process.env.PROD_DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    logQueryParameters: (process.env.SEQUELIZE_LOGGING === 'true') ? true : false,
    migrationStorage: 'sequelize',
  }
};
