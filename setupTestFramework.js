const db = require('./src/db/models');

async function closeDB() {
  await db.sequelize.close();
}
async function clearLocations() {
  await db.Locations.destroy({
    where: {},
    truncate: true,
  });
}
afterEach(clearLocations);
afterAll(closeDB);
