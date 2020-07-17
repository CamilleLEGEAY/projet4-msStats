"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const api_routes_1 = require("./api-routes");
require('dotenv').config();
var app = express_1.default();
// CORS enabled with express/node-js : 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //ou avec "www.xyz.com" à la place de "*" en production
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(api_routes_1.apiRouter);
app.listen(process.env.PORT, function () {
    console.log("J'écoute");
    //fillMongoDB("2020-07-15");
});
