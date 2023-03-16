const express = require('express');
const path = require('path');
const cors = require("cors")

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// import {PythonShell} from 'python-shell';

// PythonShell.run('main.py', null, function (err) {
//   if (err) throw err;
//   console.log('finished');
// });


const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});


const whitelist = ["https://erwinmedina.github.io/the-golden-boot/"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))