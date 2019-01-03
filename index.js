/**
 * @file index.js
 * @description Entry point of App
 * 
 * @author Arth K. Gajjar <iarthstar@gmail.com>
 * @version 1.0
 */



//
// ────────────────────────────────────────────────────────── INIT APP ────────
//

const utils = require("./scripts/utils");
utils.initApp();

// env variables
const env  = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 8080;

// modules import
const express    = require('express');
const bodyParser = require('body-parser');

// modules init
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// server init
app.listen(port, () => {
  utils.success(`listening on port ${port}!`);
});

//
// ────────────────────────────────────────────────────────────────────────────
//




//
// ──────────────────────────────────────────────────────────── ROUTES ────────
//

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/public/popit.html`);
});

//
// ────────────────────────────────────────────────────────────────────────────
//