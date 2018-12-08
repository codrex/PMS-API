function createMockLocation(parentLocation = null) {
  return {
    name: 'maryland lagos',
    maleResidents: 30,
    femaleResidents: 30,
    parentLocation,
  };
}

module.exports = {
  createMockLocation,
};
