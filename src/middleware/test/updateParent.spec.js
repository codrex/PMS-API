const Locations = require('../../lib/repositories/locations');
const db = require('../../db/models');
const { createMockLocation } = require('../../constants');
const updateParent = require('../updateParent');

const ctx = {
  db,
  params: {},
};
const next = jest.fn(async () => {
  await Locations.delete(db, ctx.params.id);
});
let grandParent;
let parent;
let childOne;
let childTwo;

describe('update parent location', () => {
  beforeAll(async () => {
    const grandParentMockLocation = createMockLocation();
    grandParent = await Locations.create(db, grandParentMockLocation);
    const parentMockLocation = createMockLocation(grandParent.id);
    parent = await Locations.create(db, parentMockLocation);
    const childMockLocation = createMockLocation(parent.id);
    childOne = await Locations.create(db, childMockLocation);
    childTwo = await Locations.create(db, childMockLocation);
  });
  it("should update parent location of a location's children to their grandparent", async () => {
    ctx.params.id = parent.id;
    await updateParent(ctx, next);
    childOne = await childOne.reload();
    childTwo = await childTwo.reload();
    grandParent = await Locations.get(db, grandParent.id);
    expect(next).toBeCalledTimes(1);
    expect(childOne.parentLocationId).toBe(grandParent.id);
    expect(childOne.childLocationId).toBe(grandParent.id);
    expect(childTwo.parentLocationId).toBe(grandParent.id);
    expect(childTwo.childLocationId).toBe(grandParent.id);
    expect(grandParent.childrenLocations.length).toBe(2);
    expect(grandParent.childrenLocations[0].id).toBe(childOne.id);
    expect(grandParent.childrenLocations[1].id).toBe(childTwo.id);
  });
  it('should call next when an error occurs', async () => {
    ctx.params.id = parent.id;
    await updateParent(null, next);
    expect(next).toBeCalledTimes(1);
  });
});
