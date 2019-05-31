import {Commento} from './commento.model';
import {Ricetta} from './ricetta.model';
export class Utente {
    id: number;
    username: string;
    password: string;
    email: string;
    stato: boolean;
    nome: string;
    cognome: string;
    commenti: Commento[];
    preferiti: Ricetta[];
}
