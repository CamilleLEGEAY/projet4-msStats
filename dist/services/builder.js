"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const etablissementSortant_1 = require("../data/etablissementSortant");
class Builder {
    /**
     * @param EtablissementEntrant
     * @returns EtablissementSortant
     */
    etablissementEntrantToSortant(entrant) {
        var sortant = new etablissementSortant_1.EtablissementSortant;
        sortant.date_creation = entrant.date_creation;
        sortant.activite_principale = this.findActivite(entrant).substring(0, 2);
        if (entrant.code_postal.startsWith('97')) {
            sortant.code_postal = entrant.code_postal.substring(0, 3);
        }
        else
            sortant.code_postal = entrant.code_postal.substring(0, 2);
        sortant._id = sortant.date_creation + sortant.activite_principale + sortant.code_postal;
        return sortant;
    }
    /**
     * @param listeEtablissementEntrant
     * @returns listeEtablissementSortant
     */
    arrayEtablissementBuilder(listeEntrant) {
        var listeSortant = new Array();
        for (let etablissement of listeEntrant) {
            if (etablissement.code_postal != null) {
                listeSortant.push(this.etablissementEntrantToSortant(etablissement));
            }
        }
        return listeSortant;
    }
    findActivite(entrant) {
        var activite;
        if (entrant.activite_principale != null) {
            activite = entrant.activite_principale;
        }
        else {
            if (entrant.activite_principale_registre_metiers != null)
                activite = entrant.activite_principale_registre_metiers.substring(0, 2) + "." + entrant.activite_principale_registre_metiers.substring(2, 5);
        }
        return activite;
    }
}
exports.Builder = Builder;
