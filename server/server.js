require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3001;
const REDIS_URL = process.env.REDIS_URL;
const MONGO_URI = process.env.MONGO_URI;

const client = redis.createClient({
    url: REDIS_URL
});

client.on('error', (err) => {
    console.log('Redis Client Error', err);
});

(async () => {
    await client.connect();
})();

// Connect to Mongo!
let db;
const mongoClient = new MongoClient(MONGO_URI)

mongoClient.connect()
  .then(() => {
    db = mongoClient.db("Teams")
    console.log("Connected to the BONGO MONGO!")
  })
  .catch(err => {
    console.error("Connection error with the Mongo Bongo!", err)
  })

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

// MONGO GET DATA
app.get("/api/data", async(req, res) => {
  try {
    const { sportsId, year }  = req.query;
    const collection = db.collection("AllTeams");
    const data = await collection.find({sportsId: parseInt(sportsId), year: parseInt(year)}).toArray();
    res.json(data)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

app.use('/api', require('./routes/football-service')(client));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
