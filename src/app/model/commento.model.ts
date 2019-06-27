import {Immagine} from "./immagine.model";

export class Commento {

    id: number;
    testo: string;
    data: string;
    ora: string;
    bannato: boolean;
    username: string;
    immagineutente: Immagine;
    idutente: number;
    idricetta: number;
}
