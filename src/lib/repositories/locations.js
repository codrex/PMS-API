const pushId = require('pushid');

class Locations {
  static parentLocation(db) {
    return {
      model: db.Locations,
      as: 'parentLocation',
    };
  }

  static childrenLocations(db) {
    return {
      model: db.Locations,
      as: 'childrenLocations',
    };
  }

  static async _setParentLocation(db, parentLocationId, locationInstance) {
    if (parentLocationId) {
      const parent = await Locations.get(db, parentLocationId);
      await parent.setChildrenLocations(locationInstance.id);
      await locationInstance.setParentLocation(parentLocationId);
      const record = await Locations.get(db, locationInstance.id);
      return record;
    }
    return locationInstance;
  }

  static async create(db, location) {
    const { parentLocation, ...data } = location;
    data.id = pushId();
    let record = await db.Locations.create(data);
    record = await Locations._setParentLocation(db, parentLocation, record);
    return record;
  }

  static async get(db, id) {
    const record = await db.Locations.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['parentLocationId', 'childLocationId'] },
      include: [Locations.parentLocation(db), Locations.childrenLocations(db)],
    });
    return record;
  }

  static async update(db, id, locationUpdate) {
    let location = await Locations.get(db, id);
    if (location) {
      location = await location.update(locationUpdate, {
        fields: ['maleResidents', 'femaleResidents', 'name'],
      });
      return location;
    }
    return null;
  }

  static async delete(db, id) {
    const result = await db.Locations.destroy({
      where: {
        id,
      },
    });
    return result;
  }
}

module.exports = Locations;
