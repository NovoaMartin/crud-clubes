const ClubController = require('./controller/clubController');
const ClubService = require('./service/clubService');
const ClubRepository = require('./repository/clubRepository');

function init(app, container) {
  container.get('ClubController').configureRoutes(app);
}

module.exports = {
  init,
  ClubController,
  ClubService,
  ClubRepository,
};
