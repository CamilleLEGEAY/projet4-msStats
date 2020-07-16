import { EtablissementEntrant } from '../data/etablissementEntrant';
import { Builder } from '../services/builder';
import { DateServices } from '../services/date';
import { ReponseApiEtablissements } from '../data/reponsesAPI';
import axios from 'axios';
import { EtablissementSortant } from '../data/etablissementSortant';

const myMongoClient = require('./my_generic_mongo_client');
const builder: Builder = new Builder();
const dateService: DateServices = new DateServices();
const urlEtablissement: string = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?statut_diffusion=O&per_page=100';

var reponse: ReponseApiEtablissements;

/**
 * update mongoDB
 */
export async function update() {
    let dateMAJ = new Date()
    let yesterday = dateService.yesterday(dateMAJ);
    //let daysAgo = dateService.daysAgo(dateMAJ, 15);
    //await cleanMongoDB("2020-07-01");
    await fillMongoDB(yesterday);
    console.log("tout va bien");
};

/**
 * fill in database with businesses created yesterday
 */
export async function fillMongoDB(dateCreation: string): Promise<string> {
    let listeAEnregistrer = (await stat(dateCreation)).values();
    for (let etablissement of listeAEnregistrer) {
        if (reponse.meta.total_results > 200) {
            await new Promise(r => setTimeout(r, 100));
        }
        myMongoClient.genericInsertOne(process.env.COLLECTION, etablissement, function (err: any, etablissement: any) { });
    }
    return "fillMongoDB lancé";
}
/**
 * prepare stats/indicator
 */
async function stat(dateCreation: string): Promise<Map<string,EtablissementSortant>> {
    let map :Map<string,EtablissementSortant> = new Map();
    let listeATraiter: Array<EtablissementSortant>;
    await findAllPagesEtablissements(dateCreation).then((data) => {
        listeATraiter = builder.arrayEtablissementBuilder(data);
        for(let item of listeATraiter) {
            if(!map.has(item._id)){
                item.qtes =1;
                map.set(item._id,item);
            }
            else{
                let updateItem = map.get(item._id);
                updateItem.qtes = updateItem.qtes +1;
                map.set(item._id, updateItem);
            }   
        }
    });
    return map ;
}
/**
 * crea the liste of new businesses by browsing pages
 * 2 requests/second (API SIRENE allow 7/second) 
 */
async function findAllPagesEtablissements(dateCreation: string): Promise<EtablissementEntrant[]> {
    let page: number = 1;
    let listeEtablissements: Array<EtablissementEntrant> = new Array<EtablissementEntrant>();
    do {
        reponse = await findOnePageEtablissements(page, dateCreation);
        await new Promise(r => setTimeout(r, 500));
        page++;
        listeEtablissements = listeEtablissements.concat(reponse.etablissements);
    }
    while (reponse.meta.total_pages > reponse.meta.page);
    console.log("nombre d'entreprise créées : " + reponse.meta.total_results);
    return listeEtablissements;
}
/**
 * provide a page of results from the API SIRENE for businesses created yesterday
 * no treatment because we need the meta in other function to know the number of pages
 * @param numeroPage 
 */
async function findOnePageEtablissements(numeroPage: number, dateCreation: string): Promise<ReponseApiEtablissements> {
    try {
        let url = urlEtablissement + "&page=" + numeroPage + "&date_creation=" + dateCreation;
        let reponseJSON: ReponseApiEtablissements = (await axios.get(url)).data;
        return reponseJSON;
    }
    catch (e) {
        console.log(e);
        let reponseJSON: ReponseApiEtablissements = new ReponseApiEtablissements();
        reponseJSON.etablissements = [];
        reponseJSON.meta.page = 0;
        reponseJSON.meta.per_page = 0;
        reponseJSON.meta.total_pages = 0;
        reponseJSON.meta.total_results = 0;
        return reponseJSON;
    }
}