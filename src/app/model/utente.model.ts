import {Commento} from './commento.model';
import {Ricetta} from './ricetta.model';
import {Immagine} from './immagine.model';
export class Utente {
    id: number;
    username: string;
    email: string;
    password: string;
    stato: boolean;
    nome: string;
    cognome: string;
    commento: Commento[];
    preferito: Ricetta[];
    immagine: Immagine;
     verificaPreferito(idRicetta: number): boolean {
        const pref: Ricetta[] = this.preferito;
        const i: number[] = [];
        for (const ric of pref) {
            i.push(ric.id);
        }
        if (i.includes(idRicetta)) {
            return true;
        } else {
            return false;
        }

    }
}
