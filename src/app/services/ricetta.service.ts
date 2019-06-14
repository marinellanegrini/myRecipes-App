import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Ricetta} from '../model/ricetta.model';
import {Observable, of} from 'rxjs';
import {Commento} from '../model/commento.model';
import {Cibo} from '../model/cibo.model';
import {Ingrediente} from '../model/ingrediente.model';
import {Categoria} from '../model/categoria.model';
import {URL} from '../constants';
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class RicettaService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Ricetta[]> {
        // return this.http.get<Ricetta[]>(URL.NOTIZIE);
        let r: Ricetta = new Ricetta();
        r.id = 1;
        r.difficolta = 3;
        r.nome = 'Uova Sode';
        r.nsalvataggi = 3;
        r.ndosi = 4;
        r.procedimento = 'Prova';
        r.tprep = new Date(2);
        let c: Commento = new Commento();
        c.id = 1;
        c.bannato = false;
        c.data = new Date(2019, 12, 2);
        c.ora = new Date(2);
        c.idricetta = 1;
        c.testo = 'bella ricetta';
        c.idutente = 1;
        r.commenti = [c];
        let cibo: Cibo = new Cibo();
        cibo.id = 1;
        cibo.nome = 'Uova';
        cibo.um = 'pz';
        let i: Ingrediente = new Ingrediente();
        i.id = 1;
        i.cibo = cibo;
        i.qta = 4;
        r.ingredienti = [i];
        let cat: Categoria = new Categoria();
        cat.id = 1;
        cat.nome = 'Secondi piatti';
        r.categoria = cat;
        let ricette: Ricetta[] = [r, r, r, r, r];
        return of(ricette);
    }

    findById(ricettaId: number): Observable<Ricetta> {
        const apiURL = `${URL.RICETTE}/${ricettaId}`;
        return this.http.get<Ricetta>(apiURL);
    }

    preferiti(): Observable<Ricetta[]> {
        const apiURL = URL.PREFERITI;
        return this.http.get<Ricetta[]>(apiURL);
    }

    ricercaAvanzata(filtri): Observable<Ricetta[]> {
        // chiamata al server per la ricerca
        return this.http.post<Ricetta[]>(URL.RICAVANZATA, filtri, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Ricetta[]>) => {
                return resp.body;
            }));
    }


}
