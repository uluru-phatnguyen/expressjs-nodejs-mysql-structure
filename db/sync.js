const { sequelize } = require('./index');

const forceMigrate = process.argv[2];
const options = {
  force: !!forceMigrate
};

sequelize.sync(options).then(() => {
  console.log('Sync success!');
  process.exit(0);
}, (err) => {
  console.error('Sync error', err);
  process.exit(0);
});
