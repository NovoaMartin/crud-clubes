module.exports = class Club {
  constructor({
    id,
    name,
    shortName,
    crestUrl,
    address,
    founded,
    clubColors,
  }) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.crestUrl = crestUrl;
    this.address = address;
    this.founded = founded;
    this.clubColors = clubColors;
  }
};
