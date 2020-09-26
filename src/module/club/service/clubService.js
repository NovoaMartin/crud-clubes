const { v4: uuidv4 } = require('uuid');

module.exports = class ClubService {
  constructor(clubRepository) {
    this.clubRepository = clubRepository;
  }

  async save(club) {
    if (club.id === '') {
      club.id = uuidv4();
    }
    return this.clubRepository.save(club);
  }

  async delete(club) {
    return this.clubRepository.delete(club);
  }

  async getClub(id) {
    return this.clubRepository.getClub(id);
  }

  async getClubs() {
    return this.clubRepository.getClubs();
  }
};
