require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3001;
const REDIS_URL = process.env.REDIS_URL;

const client = redis.createClient({
    url: REDIS_URL
});

client.on('error', (err) => {
    console.log('Redis Client Error', err);
});

(async () => {
    await client.connect();
})();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use('/api', require('./routes/football-service')(client));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
