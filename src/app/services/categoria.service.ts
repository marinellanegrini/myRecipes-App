import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Categoria} from '../model/categoria.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Categoria[]> {
        // return this.http.get<Ricetta[]>(URL.NOTIZIE);
        const c: Categoria = new Categoria();
        c.id = 1;
        c.nome = 'Antipasti';
        const c1: Categoria = new Categoria();
        c1.id = 2;
        c1.nome = 'Primi';
        const c2: Categoria = new Categoria();
        c2.id = 3;
        c2.nome = 'Secondi';
        const cat: Categoria[] = [c, c1, c2];
        return of(cat);
    }

}
