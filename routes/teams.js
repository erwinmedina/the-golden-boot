// Import required modules
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Define API endpoint
const BASE_URL = 'https://api.football-data.org/v2';

// Define route to fetch teams data
router.get(':id/teams/:seasonID', async (req, res) => {
  try {
    console.log(req.params);
    const { id, seasonID } = req.params;
    const response = await fetch(`${BASE_URL}/competitions/${id}/teams?season=${seasonID}`, {
      headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;