const express = require('express');
const axios = require('axios');
const router = express.Router();
const NEW_URL = "https://api.football-data.org/v4";

module.exports = (client) => {

  // *************************** //
  // Handles the caching portion //
  // *************************** //
  const checkCache = (endpoint) => async (req, res, next) => {
      const { id, seasonID } = req.query;
      const cacheKey = `${endpoint}:${id}:${seasonID}`;
      
      try {
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
          const ttl = await client.ttl(cacheKey);
          console.log(`I hit the cache! Non-competition route - ${new Date().getTime()}`)
          return res.json(JSON.parse(cachedData));
        } else {
          next();
        }
      } catch (error) {
        console.error('Error checking cache:', error);
        next();
      }
  }

  // **************************************** //
  // Handles caching for competition api call //
  // **************************************** //
  const checkCacheById = (endpoint) => async (req, res, next) => {
    const { id } = req.query;
    const cacheKey = `${endpoint}:${id}`;

    try {
      const cachedData = await client.get(cacheKey);
      if (cachedData) {

        console.log(`I hit the cache! Competition route - ${new Date().getTime()}`)
        return res.json(JSON.parse(cachedData));
      } else {
        next();
      }
    } catch (error) {
      console.error('Error checking cache:', error);
      next();
    }
  }

  // ******************************** //
  // Fetch data from API and cache it //
  // ******************************** //

  async function fetchDataAndCache(req, res, endpoint) {
    const { id, seasonID } = req.query;
    const token = process.env.REACT_APP_FOOTBALL_API;

    if (!token) {
      return res.status(400).json({ error: 'API token is missing!' });
    }
    try {
      const response = await axios.get(`${NEW_URL}/competitions/${id}/${endpoint}?season=${seasonID}`, {
        headers: { 'X-Auth-Token': token },
      });
      console.log(`I hit the API; non-competition route! - ${new Date().getTime()}`)
      
      const cacheKey = `${endpoint}:${id}:${seasonID}`;
      await client.set(cacheKey, JSON.stringify(response.data));
      await client.expire(cacheKey, 300);

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch ${endpoint} from the API`});
    }
  }

  // ****************************************** //
  // Fetch data from API and cache it [only ID] //
  // ****************************************** //
  async function fetchDataByIdAndCache(req, res, endpoint) {
    const { id } = req.query;
    const token = process.env.REACT_APP_FOOTBALL_API;

    if (!token) {
      return res.status(400).json({ error: 'API token is missing!' });
    }
    try {
      const response = await axios.get(`${NEW_URL}/${endpoint}/${id}`, {
        headers: { 'X-Auth-Token': token },
      });
      console.log(`I hit the API; In the competition route! - ${new Date().getTime()}`)

      const cacheKey = `${endpoint}:${id}`;
      await client.set(cacheKey, JSON.stringify(response.data));
      await client.expire(cacheKey, 300);

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch ${endpoint} from the API` });
    }
  }

  // ************** //
  // Route Handlers //
  // ************** //
  router.get('/teams', checkCache('teams'), (req, res) => fetchDataAndCache(req, res, 'teams'));
  router.get('/matches', checkCache('matches'), (req, res) => fetchDataAndCache(req, res, 'matches'));
  router.get('/scorers', checkCache('scorers'), (req, res) => fetchDataAndCache(req, res, 'scorers'));
  router.get('/standings', checkCache('standings'), (req, res) => fetchDataAndCache(req, res, 'standings'));
  router.get('/competitions', checkCacheById('competitions'), (req, res) => fetchDataByIdAndCache(req, res, 'competitions'));

  return router;
};