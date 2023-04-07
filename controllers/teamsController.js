// Import required modules
const fetch = require('node-fetch');
const Model = require('../models/Model');

// Define API endpoint
const BASE_URL = 'https://api.football-data.org/v2';

// Define function to fetch teams data
const getTeams = async (id, seasonID) => {
  console.log(id, seasonID);
  try {
    const response = await fetch(`${BASE_URL}/competitions/${id}/teams?season=${seasonID}`, {
      headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API }
    });
    const data = await response.json();
    const models = data.teams.map((team) => new Model(team));
    return models;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch teams data');
  }
};

module.exports = {
  getTeams
};
