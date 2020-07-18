"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const api_routes_1 = require("./api-routes");
require('dotenv').config();
var app = express_1.default();
//const cors = require('cors');
//app.use(cors());
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(api_routes_1.apiRouter);
app.listen(process.env.PORT, function () {
    console.log("J'écoute");
    //fillMongoDB("2020-07-15");
});
