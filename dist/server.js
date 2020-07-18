"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const api_routes_1 = require("./api/api-routes");
require('dotenv').config();
var app = express_1.default();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.ORIGINE); //ou avec "www.xyz.com" à la place de "*" en production
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(api_routes_1.apiRouter);
app.listen(process.env.PORT, function () {
    console.log("J'écoute");
});
