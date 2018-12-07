function setTotalResidents(location) {
  const { femaleResidents, maleResidents } = location;
  // eslint-disable-next-line
  location.totalResidents = femaleResidents + maleResidents;
  return location;
}

module.exports = {
  setTotalResidents,
};
