const Club = require('../entity/Club');

module.exports = class ClubRepository {
  constructor(filesystem, dbpath) {
    this.filesystem = filesystem;
    this.db = dbpath;
  }

  async save(club) {
    const dbContent = this.readDB();
    const index = dbContent.findIndex((tempClub) => tempClub.id == club.id);
    if (index === -1) {
      dbContent.push(club);
    } else {
      const clubOld = dbContent[index];
      dbContent[index] = club;
      if (!club.crestUrl) {
        dbContent[index].crestUrl = clubOld.crestUrl;
      }
    }

    this.saveToDB(dbContent);
  }

  async delete(club) {
    let dbContent = this.readDB();
    dbContent = dbContent.filter((tempClub) => tempClub.id != club);
    this.saveToDB(dbContent);
  }

  async getClubs() {
    return this.readDB().map((data) => new Club(data));
  }

  async getClub(id) {
    const dbContent = this.readDB();
    const club = dbContent.find((tempClub) => tempClub.id == id);

    if (!club) {
      throw new Error('Club not found');
    }
    return new Club(club);
  }

  readDB() {
    const data = this.filesystem.readFileSync(this.db, { encoding: 'utf-8' });
    let jsonContent;
    try {
      jsonContent = JSON.parse(data);
    } catch (e) {
      jsonContent = [];
    }
    return jsonContent;
  }

  saveToDB(data) {
    this.filesystem.writeFileSync(this.db, JSON.stringify(data));
  }
};
