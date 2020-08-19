const path = require('path');
const fromDataToEntity = require('../mapper/clubMapper');

class ClubController {
  constructor(clubService) {
    this.ROUTE = '/club';
    this.clubService = clubService;
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
    app.get(`${this.ROUTE}`, this.index.bind(this));
    app.get(`${this.ROUTE}/create`, this.create.bind(this));
    app.get(`${this.ROUTE}/update/:team`, this.update.bind(this));
    app.get(`${this.ROUTE}/delete/:team`, this.delete.bind(this));
  }

  async index(req, res) {
    const clubs = await this.clubService.getClubs();
    res.render('base', {
      layout: 'base',
      data: {
        clubs,
      },
    });
  }

  async create() {

  }

  async update() {

  }

  async delete() {

  }
}

module.exports = ClubController;
