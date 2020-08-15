const path = require('path');
const fromDataToEntity = require('../mapper/clubMapper');

class ClubController {
  constructor(clubService) {
    this.ROUTE = '/club';
    this.clubService = clubService;
  }

  configureRoutes(app) {
    app.get('/', this.index);
    app.get(`${this.ROUTE}`, this.index);
    app.get(`${this.ROUTE}/create`, this.create);
    app.get(`${this.ROUTE}/update/:team`, this.update);
    app.get(`${this.ROUTE}/delete/:team`, this.delete);
  }

  async index(req, res) {
    res.render('base', {
      layout: 'base',
    });
    // res.sendFile('base.handlebars', { root: path.resolve('src/module/view/layout') });
  }

  async create() {

  }

  async update() {

  }

  async delete() {

  }
}

module.exports = ClubController;
