const joi = require('joi');

const name = joi.string().trim();
const residents = joi
  .number()
  .positive()
  .allow(0)
  .integer();
const locationId = joi.string().trim();
const locationCreate = joi.object({
  name: name.required(),
  maleResidents: residents.required(),
  femaleResidents: residents.required(),
  parentLocation: locationId,
});

const locationUpdate = joi.object({
  name,
  maleResidents: residents,
  femaleResidents: residents,
  parentLocation: locationId,
});

module.exports = { locationCreate, locationUpdate };
