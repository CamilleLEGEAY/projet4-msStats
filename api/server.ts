import express  from 'express';
import * as bodyParser from 'body-parser';
import { update, fillMongoDB } from './dailyUpdate';
import { apiRouter } from './api-routes';
require('dotenv').config()

var app = express();
const cors = require('cors'); //<-- required installing 'cors' (npm i cors --save)
app.use(cors());


var jsonParser = bodyParser.json() ;

app.use(jsonParser);

app.use(apiRouter);

app.listen(process.env.PORT , function () {
  console.log("J'écoute");
  //fillMongoDB("2020-07-15");
});