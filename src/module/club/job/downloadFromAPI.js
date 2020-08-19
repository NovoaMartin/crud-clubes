const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const API_TOKEN = process.env.API_KEY;
const API_URL = 'http://api.football-data.org/v2';
const ID_ENG = 2021;

async function getData() {
  const response = await axios.get(`${API_URL}/competitions/${ID_ENG}/teams`, {
    headers: { 'X-Auth-Token': API_TOKEN },
  });
  return response.data.teams;
}

module.exports = async function initDB() {
  const DB = process.env.JSON_DB_PATH;
  const data = await getData();
  fs.writeFileSync(DB, JSON.stringify(data));
};
