import { UniteLegaleEntrant } from "./uniteLegaleEntrant";

/**
 * un etablissement correspond à un siret
 */
export class EtablissementEntrant {

    siret: string;
    // format date : AAAA-MM-jj   
    date_creation: string;
    //format naf detaille 9602AA
    activite_principale_registre_metiers: string;
    code_postal: string;

    //etat administratif "A"= ouvert "F"=fermé
    etat_administratif: string;
    enseigne_1: string;
    enseigne_2: string;
    enseigne_3: string;
    denomination_usuelle: string;

    //Naf type : 96.02A
    activite_principale: string;
    unite_legale: UniteLegaleEntrant;
}