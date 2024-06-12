const express = require('express');
const axios = require('axios');
const router = express.Router();
const NEW_URL = "https://api.football-data.org/v4";

// ************ //
// ROUTE: TEAMS //
// ************ //
router.get('/teams', async (req, res) => {
    const { id, seasonID } = req.query;
    const token = process.env.REACT_APP_FOOTBALL_API;
    
    if (!token) {
        return res.status(400).json({ error: 'API token is missing' });
    }

    try {
        const response = await axios.get(`${NEW_URL}/competitions/${id}/teams?season=${seasonID}`, {
            method: "GET",
            headers: { 'X-Auth-Token': token }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams from the API' });
    }
});

// ************** //
// ROUTE: MATCHES //
// ************** //
router.get('/matches', async (req, res) => {
    const { id, seasonID } = req.query;
    const token = process.env.REACT_APP_FOOTBALL_API;
  
    if (!token) {
      return res.status(400).json({ error: 'API token is missing' });
    }
  
    try {
        const response = await axios.get(`${NEW_URL}/competitions/${id}/matches?season=${seasonID}`, {
            method: "GET",
            headers: { 'X-Auth-Token': token }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch matches from the API' });
    }
  });

// ************** //
// ROUTE: SCORERS //
// ************** //
router.get('/scorers', async (req, res) => {
    const { id, seasonID } = req.query;
    const token = process.env.REACT_APP_FOOTBALL_API;
  
    if (!token) {
      return res.status(400).json({ error: 'API token is missing' });
    }
  
    try {
      const response = await axios.get(`${NEW_URL}/competitions/${id}/scorers?season=${seasonID}`, {
        method: "GET",
        headers: { 'X-Auth-Token': token }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch scorers from the API' });
    }
  });

// **************** //
// ROUTE: STANDINGS //
// **************** //
router.get('/standings', async (req, res) => {
    const { id, seasonID } = req.query;
    const token = process.env.REACT_APP_FOOTBALL_API;
  
    if (!token) {
      return res.status(400).json({ error: 'API token is missing' });
    }
  
    try {
      const response = await axios.get(`${NEW_URL}/competitions/${id}/standings?season=${seasonID}`, {
        method: "GET",
        headers: { 'X-Auth-Token': token }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch standings from the API' });
    }
  });

module.exports = router;
