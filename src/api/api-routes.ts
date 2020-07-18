import { Router } from 'express';

const myMongoClient = require('./my_generic_mongo_client');

export const apiRouter = Router();

/**
 * return all etablissement of MongoDB
 */
apiRouter.route('/msStats/findAll')
    .get(function (req, res, next) {
        myMongoClient.genericFindList(process.env.COLLECTION, {}, function (err: any, liste: any) {
            if (err)
                res.send(err)
            else res.send(liste);
        })
    });

 
apiRouter.route('/msStats/findDay/:day')
    .get(async function (req, res){
        myMongoClient.genericFindList(process.env.COLLECTION, {date_creation : req.params.day}, function (err: any, liste: any) {
            if (err)
                res.send(err)
            else res.send(liste);
        })
    })

apiRouter.route('/msStats/findSecteur/:secteur')
    .get(async function (req, res){
        myMongoClient.genericFindList(process.env.COLLECTION, {activite_principale : req.params.secteur}, function (err: any, liste: any) {
            if (err)
                res.send(err)
            else res.send(liste);
        })
    })

apiRouter.route('/msStats/findDepartement/:departement')
    .get(async function (req, res){
        myMongoClient.genericFindList(process.env.COLLECTION, {code_postal : req.params.departement}, function (err: any, liste: any) {
            if (err)
                res.send(err)
            else res.send(liste);
        })
    })

apiRouter.route('/msStats/findSecteurDepartement/:secteur&:departement')
    .get(async function (req, res){
        myMongoClient.genericFindList(process.env.COLLECTION, {code_postal : req.params.departement , activite_principale : req.params.secteur}, function (err: any, liste: any) {
            if (err)
                res.send(err)
            else res.send(liste);
        })
    })
