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
        const apiURL = URL.HOMEPAGE;
        return this.http.get<Ricetta[]>(apiURL);

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
