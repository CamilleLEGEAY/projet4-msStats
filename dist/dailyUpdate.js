"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillMongoDB = exports.update = void 0;
const tslib_1 = require("tslib");
const builder_1 = require("../services/builder");
const date_1 = require("../services/date");
const reponsesAPI_1 = require("../data/reponsesAPI");
const axios_1 = tslib_1.__importDefault(require("axios"));
const myMongoClient = require('./my_generic_mongo_client');
const builder = new builder_1.Builder();
const dateService = new date_1.DateServices();
const urlEtablissement = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?statut_diffusion=O&per_page=100';
var reponse;
/**
 * update mongoDB
 */
async function update() {
    let dateMAJ = new Date();
    let yesterday = dateService.yesterday(dateMAJ);
    //let daysAgo = dateService.daysAgo(dateMAJ, 15);
    //await cleanMongoDB("2020-07-01");
    await fillMongoDB(yesterday);
    console.log("tout va bien");
}
exports.update = update;
;
/**
 * fill in database with businesses created yesterday
 */
async function fillMongoDB(dateCreation) {
    let listeAEnregistrer = (await stat(dateCreation)).values();
    for (let etablissement of listeAEnregistrer) {
        if (reponse.meta.total_results > 200) {
            await new Promise(r => setTimeout(r, 100));
        }
        myMongoClient.genericInsertOne(process.env.COLLECTION, etablissement, function (err, etablissement) { });
    }
    return "fillMongoDB lancé";
}
exports.fillMongoDB = fillMongoDB;
/**
 * prepare stats/indicator
 */
async function stat(dateCreation) {
    let map = new Map();
    let listeATraiter;
    await findAllPagesEtablissements(dateCreation).then((data) => {
        listeATraiter = builder.arrayEtablissementBuilder(data);
        for (let item of listeATraiter) {
            if (!map.has(item._id)) {
                item.qtes = 1;
                map.set(item._id, item);
            }
            else {
                let updateItem = map.get(item._id);
                updateItem.qtes = updateItem.qtes + 1;
                map.set(item._id, updateItem);
            }
        }
    });
    return map;
}
/**
 * crea the liste of new businesses by browsing pages
 * 2 requests/second (API SIRENE allow 7/second)
 */
async function findAllPagesEtablissements(dateCreation) {
    let page = 1;
    let listeEtablissements = new Array();
    do {
        reponse = await findOnePageEtablissements(page, dateCreation);
        await new Promise(r => setTimeout(r, 500));
        page++;
        listeEtablissements = listeEtablissements.concat(reponse.etablissements);
    } while (reponse.meta.total_pages > reponse.meta.page);
    console.log("nombre d'entreprise créées : " + reponse.meta.total_results);
    return listeEtablissements;
}
/**
 * provide a page of results from the API SIRENE for businesses created yesterday
 * no treatment because we need the meta in other function to know the number of pages
 * @param numeroPage
 */
async function findOnePageEtablissements(numeroPage, dateCreation) {
    try {
        let url = urlEtablissement + "&page=" + numeroPage + "&date_creation=" + dateCreation;
        let reponseJSON = (await axios_1.default.get(url)).data;
        return reponseJSON;
    }
    catch (e) {
        console.log(e);
        let reponseJSON = new reponsesAPI_1.ReponseApiEtablissements();
        reponseJSON.etablissements = [];
        reponseJSON.meta.page = 0;
        reponseJSON.meta.per_page = 0;
        reponseJSON.meta.total_pages = 0;
        reponseJSON.meta.total_results = 0;
        return reponseJSON;
    }
}
