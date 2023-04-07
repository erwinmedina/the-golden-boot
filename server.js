const express = require('express');
const path = require('path');
const teamsRouter = require("./routes/teams");
const cors = require("cors")
const { createProxyMiddleware } = require('http-proxy-middleware');


require('dotenv').config();
// require("./config/database");


const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://api.football-data.org/v2',
  changeOrigin: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use("/teams", teamsRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

app.get("/express_backend", (req, res) => {
  res.send({express: "working.."});
});


// const whitelist = ["https://erwinmedina.github.io/the-golden-boot/"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }