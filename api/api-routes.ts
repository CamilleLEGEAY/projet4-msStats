import { Router } from 'express';
import { fillMongoDB } from './dailyUpdate';

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

apiRouter.route('/msStats/update')
    .get(async function (req, res){
        res.send(fillMongoDB("2020-07-04"));
    })