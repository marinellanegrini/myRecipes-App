
import {Categoria} from './categoria.model';
import {Commento} from './commento.model';
import {Ingrediente} from './ingrediente.model';

export class Ricetta {
    id: number;
    nome: string;
    difficolta: number;
    procedimento: string;
    tprep: Date;
    numdosi: number;
    categoria: Categoria;
    ingredienti: Ingrediente[];
    commenti: Commento[];
    nsalvataggi: number;

}
