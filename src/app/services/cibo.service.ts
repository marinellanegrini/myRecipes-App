import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Cibo} from '../model/cibo.model';


@Injectable({
    providedIn: 'root'
})
export class CiboService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Cibo[]> {
        // return this.http.get<Ricetta[]>(URL.NOTIZIE);
        const cibo: Cibo = new Cibo();
        cibo.id = 1;
        cibo.nome = 'Uova';
        cibo.um = 'pz';
        const cibo2: Cibo = new Cibo();
        cibo2.id = 2;
        cibo2.nome = 'Patate';
        cibo2.um = 'gr';
        const cibo3: Cibo = new Cibo();
        cibo3.id = 3;
        cibo3.nome = 'Sale';
        cibo3.um = 'gr';
        const cibi: Cibo[] = [cibo, cibo2, cibo3];
        return of(cibi);
    }

}
