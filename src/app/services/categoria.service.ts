import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Categoria} from '../model/categoria.model';
import {URL} from '../constants';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(URL.CATEGORIE);

    }

}
