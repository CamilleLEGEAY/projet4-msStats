import { EtablissementEntrant } from './../data/etablissementEntrant';
import { EtablissementSortant } from './../data/etablissementSortant';

export class Builder {

    /**
     * @param EtablissementEntrant
     * @returns EtablissementSortant
     */
    public etablissementEntrantToSortant(entrant: EtablissementEntrant): EtablissementSortant {
        var sortant: EtablissementSortant = new EtablissementSortant;
        sortant.date_creation = entrant.date_creation;
        sortant.activite_principale = this.findActivite(entrant).substring(0,2);
        if(entrant.code_postal.startsWith('97')){
            sortant.code_postal = entrant.code_postal.substring(0,3);    
        }
        else sortant.code_postal = entrant.code_postal.substring(0,2);
        sortant._id=sortant.date_creation+sortant.activite_principale+sortant.code_postal;
        return sortant;
    }

    /**
     * @param listeEtablissementEntrant
     * @returns listeEtablissementSortant 
     */
    public arrayEtablissementBuilder(listeEntrant: Array<EtablissementEntrant>): Array<EtablissementSortant> {
        var listeSortant: Array<EtablissementSortant> = new Array<EtablissementSortant>();
        for (let etablissement of listeEntrant) {
            if(etablissement.code_postal!= null){
            listeSortant.push(this.etablissementEntrantToSortant(etablissement));
            }
        }
        return listeSortant;
    }

    private findActivite(entrant: EtablissementEntrant): string {
        var activite: string;
        if (entrant.activite_principale != null) {
            activite = entrant.activite_principale;
        } else {
            if (entrant.activite_principale_registre_metiers != null)
                activite = entrant.activite_principale_registre_metiers.substring(0, 2) + "." + entrant.activite_principale_registre_metiers.substring(2, 5);
        }
        return activite;
    }
}