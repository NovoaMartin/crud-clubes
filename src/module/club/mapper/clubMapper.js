const Club = require('../entity/Club');

module.exports = function fromDataToEntity({
  id,
  name,
  shortName,
  crestUrl,
  address,
  founded,
  clubColors,
}) {
  return new Club({
    id: Number(id),
    name,
    shortName,
    crestUrl,
    address,
    founded,
    clubColors,
  });
};
