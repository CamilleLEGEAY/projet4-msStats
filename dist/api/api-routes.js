"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const dailyUpdate_1 = require("./dailyUpdate");
const myMongoClient = require('./my_generic_mongo_client');
exports.apiRouter = express_1.Router();
/**
 * return all etablissement of MongoDB
 */
exports.apiRouter.route('/msStats/findAll')
    .get(function (req, res, next) {
    myMongoClient.genericFindList(process.env.COLLECTION, {}, function (err, liste) {
        if (err)
            res.send(err);
        else
            res.send(liste);
    });
});
exports.apiRouter.route('/msStats/update')
    .get(async function (req, res) {
    res.send(dailyUpdate_1.fillMongoDB("2020-07-04"));
});
