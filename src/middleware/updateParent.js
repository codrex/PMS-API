const Locations = require('../lib/repositories/locations');

async function updateParent(ctx, next) {
  try {
    const {
      params: { id },
      db,
    } = ctx;
    const { parentLocation, childrenLocations = [] } = await Locations.get(
      db,
      id,
    );
    if (parentLocation && childrenLocations.length) {
      const updateData = {
        parentLocationId: parentLocation.id,
        childLocationId: parentLocation.id,
      };
      const whereClause = { parentLocationId: id };
      await Locations.updateMany(db, updateData, whereClause);
    }

    await next();
  } catch (error) {
    await next();
  }
}

module.exports = updateParent;
