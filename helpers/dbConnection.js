
const { sequelize } = require('./../db');

async function assertDatabaseConnection() {
  console.log('Checking database connection...');

  try {
    await sequelize.authenticate();

    console.log('✔ Database connection OK!');
  } catch (err) {
    console.error('✘ Unable to connect to the database: \n', err.message);
    process.exit(1);
  }
}

module.exports = {
  assertDatabaseConnection,
};
