import express  from 'express';
import * as bodyParser from 'body-parser';
import { update, fillMongoDB } from './dailyUpdate';
import { apiRouter } from './api-routes';
require('dotenv').config()

var app = express();
 
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', process.env.ORIGINE); //ou avec "www.xyz.com" à la place de "*" en production
res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', '*');
next(); });

var jsonParser = bodyParser.json() ;

app.use(jsonParser);

app.use(apiRouter);

app.listen(process.env.PORT , function () {
  console.log("J'écoute");
  //fillMongoDB("2020-07-15");
});