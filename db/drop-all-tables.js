const { sequelize } = require('./index');

sequelize.drop().then(() => {
  console.log('Drop all tables success!');
  process.exit(0);
}, (err) => {
  console.error('Drop all tables error', err);
  process.exit(0);
});
