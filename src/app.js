require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { init } = require('./module/club/module.js');
const configureDI = require('./config/di');
const initDB = require('./module/club/job/downloadFromAPI');

const app = express();
const port = process.env.PORT || 80;
const hbs = exphbs.create({
  defaultLayout: 'base',
});

initDB();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '../public')));
const container = configureDI();

init(app, container);

app.listen(port, () => console.log(`Server listening at port ${port}`));
