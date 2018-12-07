const db = require('./src/db/models');

async function closeDB() {
  await db.sequelize.close();
}
afterAll(closeDB);
