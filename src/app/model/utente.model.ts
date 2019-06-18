import {Commento} from './commento.model';
import {Ricetta} from './ricetta.model';
import {Immagine} from './immagine.model';
export class Utente {
    username: string;
    password: string;
    email: string;
    stato: boolean;
    nome: string;
    cognome: string;
    commento: Commento[];
    preferiti: Ricetta[];
    immagine: Immagine;
}
