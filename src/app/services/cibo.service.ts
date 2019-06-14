import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Cibo} from '../model/cibo.model';
import {URL} from '../constants';

@Injectable({
    providedIn: 'root'
})
export class CiboService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Cibo[]> {
        return this.http.get<Cibo[]>(URL.CIBI);
    }

}
