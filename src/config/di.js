const path = require('path');
const fs = require('fs');
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const multer = require('multer');

const { ClubController, ClubService, ClubRepository } = require('../module/club/module');

function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(
      get('ClubService'),
    ),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addClubModuleDefinitions(container);
  return container;
};
