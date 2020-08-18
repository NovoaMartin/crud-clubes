const Club = require('../entity/Club');

module.exports = class ClubRepository {
  constructor(filesystem, dbpath) {
    this.filesystem = filesystem;
    this.db = dbpath;
  }

  async save(club) {
    const DbContent = this.readDB();
    const index = DbContent.findIndex((tempClub) => tempClub.id === club.id);
    if (index === -1) {
      DbContent.push(club);
    } else {
      const clubOld = DbContent[index];
      DbContent[index] = club;
      if (!club.crestUrl) {
        DbContent[index].crestUrl = clubOld.crestUrl;
      }
    }

    this.saveToDB(DbContent);
  }

  async delete(club) {
    let DbContent = this.readDB();
    DbContent = DbContent.filter((tempClub) => tempClub !== club);
    this.saveToDB(DbContent);
  }

  async getClubs() {
    return this.readDB().map((data) => new Club(data));
  }

  async getClub(id) {
    const DbContent = this.readDB();
    const club = DbContent.find((tempClub) => tempClub.id === id);

    if (!club) {
      throw new Error('Club not found');
    }
    return new Club(club);
  }

  readDB() {
    const data = this.fileSystem.readFileSync(this.db, { encoding: 'utf-8' });
    let jsoncontent;
    try {
      jsoncontent = JSON.parse(data);
    } catch (e) {
      jsoncontent = [];
    }

    return jsoncontent;
  }

  saveToDB(data) {
    this.filesystem.writeFileSync(this.db, JSON.stringify(data));
  }
};
