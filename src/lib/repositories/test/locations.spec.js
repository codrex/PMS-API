const Locations = require('../locations');
const db = require('../../../db/models');
const { createMockLocation } = require('../../../constants');

describe('Locations model repo', () => {
  describe('create', () => {
    it('should create a location ', async () => {
      const mockLocation = createMockLocation();
      const record = await Locations.create(db, mockLocation);
      expect(record.name).toBe(mockLocation.name);
      expect(record.femaleResidents).toBe(mockLocation.femaleResidents);
      expect(record.maleResidents).toBe(mockLocation.maleResidents);
      expect(record.totalResidents).toBe(
        mockLocation.maleResidents + mockLocation.femaleResidents,
      );
    });
    it('should create a relationship location and a parent location', async () => {
      const parentLocation = createMockLocation();
      let parent = await Locations.create(db, parentLocation);
      const childLocation = createMockLocation(parent.id);
      const child = await Locations.create(db, childLocation);
      parent = await parent.reload({
        include: {
          model: db.Locations,
          as: 'childrenLocations',
        },
      });
      expect(child.parentLocation.id).toBe(parent.id);
      expect(parent.childrenLocations[0].id).toBe(child.id);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const location = createMockLocation();
      let record = await Locations.create(db, location);
      const update = { name: 'Town planning road', maleResidents: 200 };
      record = await Locations.update(db, record.id, update);
      expect(record.maleResidents).toBe(update.maleResidents);
      expect(record.totalResidents).toBe(
        update.maleResidents + location.femaleResidents,
      );
    });
    it('should return null updating a non existence location', async () => {
      const update = { name: 'Town planning road', maleResidents: 200 };
      const record = await Locations.update(db, 'invalid-location-id', update);
      expect(record).toBe(null);
    });
  });

  describe('get', () => {
    it('should return a location', async () => {
      const parentLocation = createMockLocation();
      const parent = await Locations.create(db, parentLocation);
      const location = createMockLocation(parent.id);
      const expectedRecord = await Locations.create(db, location);
      const record = await Locations.get(db, expectedRecord.id);
      expect(record.dataValues).toEqual(expectedRecord.dataValues);
    });
    it('should return null when location is bot found', async () => {
      const record = await Locations.get(db, 'invalid id');
      expect(record).toEqual(null);
    });
  });

  describe('delete', () => {
    it('should delete a location', async () => {
      const location = createMockLocation();
      const record = await Locations.create(db, location);
      const result = await Locations.delete(db, record.id);
      expect(result).toEqual(1);
    });

    it('should return 0 when location is not in existence', async () => {
      const result = await Locations.delete(db, 'invalid location');
      expect(result).toEqual(0);
    });
  });

  describe('getAll', () => {
    it('should return all locations', async () => {
      await Locations.create(db, createMockLocation());
      await Locations.create(db, createMockLocation());
      await Locations.create(db, createMockLocation());
      await Locations.create(db, createMockLocation());
      await Locations.create(db, createMockLocation());
      await Locations.create(db, createMockLocation());
      const records = await Locations.getAll(db);
      expect(records.length).toBe(6);
    });
    it('should return an empty array', async () => {
      const records = await Locations.getAll(db);
      expect(records.length).toBe(0);
      expect(records).toEqual([]);
    });
  });
});
