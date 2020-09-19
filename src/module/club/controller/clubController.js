const path = require('path');
const fromDataToEntity = require('../mapper/clubMapper');

class ClubController {
  constructor(clubService, uploadMiddleware) {
    this.ROUTE = '/club';
    this.clubService = clubService;
    this.uploadMiddleware = uploadMiddleware;
  }

  configureRoutes(app) {
    app.get('/', this.index.bind(this));
    app.get(`${this.ROUTE}`, this.index.bind(this));
    app.get(`${this.ROUTE}/view/:team`, this.retrieve.bind(this));
    app.get(`${this.ROUTE}/create`, this.create.bind(this));
    app.get(`${this.ROUTE}/update/:team`, this.update.bind(this));
    app.get(`${this.ROUTE}/delete/:team`, this.delete.bind(this));
    app.post(`${this.ROUTE}/save`, this.uploadMiddleware.single('crest'), this.save.bind(this));
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

  async retrieve(req, res) {
    const club = await this.clubService.getClub(req.params.team);
    res.render('club', {
      layout: 'base',
      data: {
        club,
      },
    });
  }

  async create() {

  }

  async update(req, res) {
    const club = await this.clubService.getClub(req.params.team);
    res.render('clubEdit', {
      layout: 'base',
      data: {
        club,
      },
    });
  }

  async delete(req, res) {
    await this.clubService.delete(req.params.team);
    res.redirect('/club');
  }

  async save(req, res) {
    try {
      const club = fromDataToEntity(req.body);
      if (req.file) {
        const { path } = req.file;
        club.crestUrl = path.split('public\\')[1];
      }
      await this.clubService.save(club);
    } catch (e) {
      console.log(`ERROR: During clubController.save() ${e}`);
    }

    res.redirect('/club');
  }
}

module.exports = ClubController;
