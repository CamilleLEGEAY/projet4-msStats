"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
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
exports.apiRouter.route('/msStats/findDay/:day')
    .get(async function (req, res) {
    myMongoClient.genericFindList(process.env.COLLECTION, { date_creation: req.params.day }, function (err, liste) {
        if (err)
            res.send(err);
        else
            res.send(liste);
    });
});
exports.apiRouter.route('/msStats/findSecteur/:secteur')
    .get(async function (req, res) {
    myMongoClient.genericFindList(process.env.COLLECTION, { activite_principale: req.params.secteur }, function (err, liste) {
        if (err)
            res.send(err);
        else
            res.send(liste);
    });
});
exports.apiRouter.route('/msStats/findDepartement/:departement')
    .get(async function (req, res) {
    myMongoClient.genericFindList(process.env.COLLECTION, { code_postal: req.params.departement }, function (err, liste) {
        if (err)
            res.send(err);
        else
            res.send(liste);
    });
});
exports.apiRouter.route('/msStats/findSecteurDepartement/:secteur&:departement')
    .get(async function (req, res) {
    myMongoClient.genericFindList(process.env.COLLECTION, { code_postal: req.params.departement, activite_principale: req.params.secteur }, function (err, liste) {
        if (err)
            res.send(err);
        else
            res.send(liste);
    });
});
