import { EtablissementEntrant } from './etablissementEntrant';

export class Meta {
    total_results : number;
    per_page : number;
    total_pages : number;
    page : number;
}

export class ReponseApiEtablissements {
    etablissements : Array<EtablissementEntrant>;
    meta : Meta;
}