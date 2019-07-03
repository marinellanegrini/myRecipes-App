import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Storage} from '@ionic/storage';
import {map} from 'rxjs/operators';
import {AUTH_TOKEN, UTENTE_STORAGE, X_AUTH} from '../constants';
import {Utente} from '../model/utente.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Commento} from '../model/commento.model';
import {URL} from '../constants';
import {Immagine} from '../model/immagine.model';

export interface Account {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UtenteService {
    private authToken: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
            this.authToken = token;
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);
            }
        });
        this.storage.get(UTENTE_STORAGE).then((utente) => {
            this.utente$.next(utente);
        });

    }

    registrazione(utente: Utente): Observable<Utente> {
        return this.http.post<Utente>(URL.REGISTRAZIONE, utente, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                return resp.body;
            }));
    }
    verifyUsername(username: string): Observable<boolean> {
        const apiURL = `${URL.VERUSERNAME}/${username}`;
        return this.http.get<boolean>(apiURL);
    }

    login(account: Account): Observable<Utente> { // prende un account e restituisce Observable<Utente>
         return this.http.post<Utente>(URL.LOGIN, account, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                const token = resp.headers.get(X_AUTH);
                this.storage.set(AUTH_TOKEN, token);
                this.authToken = token;
                // Utente memorizzato nello storage in modo tale che se si vuole cambiare il
                // profilo dell'utente stesso non si fa una chiamata REST.
                this.storage.set(UTENTE_STORAGE, resp.body); // l'Utente è nel body della risposta
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                this.loggedIn$.next(true);
                return resp.body;
            }));
    }

    logout() {
        this.authToken = null;
        this.loggedIn$.next(false);
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);
    }

    getUtente(): BehaviorSubject<Utente> {
        return this.utente$;
    }

    getAuthToken(): string {
        return this.authToken;
    }

    isLogged(): Observable<boolean> {
        return this.loggedIn$.asObservable(); // sarebbe un BehaviourSubject
    }
    updateProfilo(nuovoUtente: Utente): Observable<Utente> {
        return this.http.post<Utente>(URL.UPDATE_PROFILO, nuovoUtente, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                // Aggiornamento dell'utente nello storage.
                // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                return resp.body;
            }));
    }
    updateFoto(nuovaFoto: Immagine): Observable<Utente> {
        console.log(nuovaFoto);
        return this.http.post<Utente>(URL.UPDATE_IMGPROFILO, nuovaFoto, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                // Aggiornamento dell'utente nello storage.
                // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                return resp.body;
            }));
    }


    aggiungiAPreferiti(ricettaId: number): void {
        const apiURL = `${URL.AGGIUNGIPREFERITI}/${ricettaId}`;
        this.http.get<Utente>(apiURL).subscribe( (nuovoUtente) => {
            this.storage.set(UTENTE_STORAGE, nuovoUtente);
            this.utente$.next(nuovoUtente);
        });
    }

    rimuoviDaPreferiti(ricettaId: number): void {
        const apiURL = `${URL.RIMUOVIPREFERITI}/${ricettaId}`;
        this.http.get<Utente>(apiURL).subscribe( (nuovoUtente) => {
            this.storage.set(UTENTE_STORAGE, nuovoUtente);
            this.utente$.next(nuovoUtente);
        });
    }

    commenta(commento: Commento) {
        return this.http.post(URL.COMMENTO, commento, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                this.storage.set(UTENTE_STORAGE, resp.body);
                this.utente$.next(resp.body);
            }));
    }

    findById(utenteId: number): Observable<Utente> {
        const apiURL = `${URL.UTENTE}/${utenteId}`;
        return this.http.get<Utente>(apiURL);
    }


    rimuoviCommento(commentoId: number): void {
        const apiURL = `${URL.RIMUOVICOMMENTO}/${commentoId}`;
        this.http.get<Utente>(apiURL).subscribe( (nuovoUtente) => {
            this.storage.set(UTENTE_STORAGE, nuovoUtente);
            this.utente$.next(nuovoUtente);
        });
    }

}
