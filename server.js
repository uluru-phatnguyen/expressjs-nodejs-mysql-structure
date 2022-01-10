const app = require('./app');
const { assertDatabaseConnection } = require('./helpers/dbConnection');
const { port } = require('./config/index');

async function startServer() {
  await assertDatabaseConnection();

  app.listen(port, () => {
    console.log(`Karios server started on port ${port}.`);
  });
}

startServer();
