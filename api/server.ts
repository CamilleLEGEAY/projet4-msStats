import express  from 'express';
import * as bodyParser from 'body-parser';
import { update } from './dailyUpdate';
import { apiRouter } from './api-routes';
import { EtablissementSortant } from '../data/etablissementSortant';
require('dotenv').config()

var app = express();

// CORS enabled with express/node-js : 
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); //ou avec "www.xyz.com" à la place de "*" en production
res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next(); });

var jsonParser = bodyParser.json() ;

app.use(jsonParser);

app.use(apiRouter);

app.listen(process.env.PORT , function () {
  console.log("J'écoute");
});