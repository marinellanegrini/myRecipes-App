import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {LINGUA} from '../app/constants';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

export class Lingua {
  etichetta: string;
  valore: string;


}

@Injectable({
    providedIn: 'root' // crea un'unica istanza della classe e la rende disponibile ovunque (root). serve per fare Dependencies Injection
})
export class LinguaService { // usata dai vari componenti per il dialogo col db locale sulla lingur

    italiano: Lingua = {etichetta: 'Italiano', valore: 'it'}; // lingua predefinita
    lingue: Lingua[] = [this.italiano, {etichetta: 'English', valore: 'en'}]; // tutte le lingua messe in questo array

    constructor(private storage: Storage) { // iniettato il componente che accede al db

    }

    getLinguaAttuale(): Observable<string> { // gestione asincrona (oggetti observable)
        return fromPromise(this.storage.get(LINGUA));
    }

    getLinguaPreferita(): string {
        return this.italiano.valore;
    }

    getLingue(): Lingua[] {
        return this.lingue;
    }

    updateLingua(nuovaLingua: string) {
        this.storage.set(LINGUA, nuovaLingua); // gli passiamo la nuova lingua e chiamiamo set (la chiave è una costante stringa)
    }


}
