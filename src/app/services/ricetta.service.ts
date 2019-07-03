import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Ricetta} from '../model/ricetta.model';
import {Observable, of} from 'rxjs';
import {URL, UTENTE_STORAGE} from '../constants';
import {map} from "rxjs/operators";
import {Utente} from "../model/utente.model";
import {Storage} from "@ionic/storage";


@Injectable({
    providedIn: 'root'
})
export class RicettaService {

    constructor(private http: HttpClient,
                private storage: Storage) {
    }

    list(n: number): Observable<Ricetta[]> {
        const apiURL = `${URL.HOMEPAGE}/${n}`;
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


    ricercaIngredienti(ingredienti): Observable<Ricetta[]> {
        // chiamata al server per la ricerca

        return this.http.post<Ricetta[]>(URL.RICINGREDIENTI, ingredienti, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Ricetta[]>) => {
                return resp.body;
            }));

    }

    ricercaPerNome(nome): Observable<Ricetta[]> {
        // chiamata al server per la ricerca
        const apiURL = `${URL.RICNOME}/${nome}`;
        return this.http.get<Ricetta[]>(apiURL);
    }


    aggiungiAPreferiti(ricettaId: number): void {
        const apiURL = `${URL.AGGIUNGIPREFERITI}/${ricettaId}`;
        this.http.get<Utente>(apiURL).subscribe( (nuovoUtente) => {
            this.storage.set(UTENTE_STORAGE, nuovoUtente);
        });
    }
    rimuoviDaPreferiti(ricettaId: number): void {
        const apiURL = `${URL.RIMUOVIPREFERITI}/${ricettaId}`;
        this.http.get<Utente>(apiURL).subscribe( (nuovoUtente) => {
            this.storage.set(UTENTE_STORAGE, nuovoUtente);
        });
    }




}
