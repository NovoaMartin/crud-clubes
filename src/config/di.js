const path = require('path');
const fs = require('fs');
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const multer = require('multer');

const { ClubController, ClubService, ClubRepository } = require('../module/club/module');

function getDBPath() {
  return process.env.JSON_DB_PATH;
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.CRESTS_DIR);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({ storage });
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    fs,
    JSONDB: factory(getDBPath),
    Multer: factory(configureMulter),
  });
}

function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('ClubService'), get('Multer')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('fs'), get('JSONDB')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addClubModuleDefinitions(container);
  return container;
};
