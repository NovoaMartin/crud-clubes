const Club = require('../entity/Club');

module.exports = function fromDataToEntity({
  id,
  name,
  shortName,
  tla,
  crestUrl,
  address,
  phone,
  website,
  email,
  founded,
  clubColors,
  venue,
}) {
  return new Club({
    id,
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
  });
};
