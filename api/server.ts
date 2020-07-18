import express  from 'express';
import * as bodyParser from 'body-parser';
import { update, fillMongoDB } from './dailyUpdate';
import { apiRouter } from './api-routes';
require('dotenv').config()

var app = express();
//const cors = require('cors');
//app.use(cors());

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});


var jsonParser = bodyParser.json() ;

app.use(jsonParser);

app.use(apiRouter);

app.listen(process.env.PORT , function () {
  console.log("J'écoute");
  //fillMongoDB("2020-07-15");
});