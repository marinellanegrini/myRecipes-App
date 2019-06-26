
import {Categoria} from './categoria.model';
import {Commento} from './commento.model';
import {Ingrediente} from './ingrediente.model';
import {Immagine} from "./immagine.model";

export class Ricetta {
    id: number;
    nome: string;
    difficolta: number;
    procedimento: string;
    tprep: Date;
    ndosi: number;
    categoria: Categoria;
    ingredienti: Ingrediente[];
    commenti: Commento[];
    nsalvataggi: number;
    immagine: Immagine;
    imgpreparazione: Immagine[];
    getIdUtenti(): number[] {
        const i: number[] = [];
        for (const comm of this.commenti) {
            i.push(comm.idutente);
        }
        return i;

    }

}
