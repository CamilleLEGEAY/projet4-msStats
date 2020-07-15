/**
 * un etablissement correspond à un siret
 */
export class EtablissementSortant {

    _id : string;
    // format date : AAAA-MM-jj   
    date_creation: string;
    //format naf detaille 96.02A
    activite_principale: string;
    code_postal: string;
    //nombre d'entreprise ayant la même combinaison des trois autres attributs
    qtes : number;
}