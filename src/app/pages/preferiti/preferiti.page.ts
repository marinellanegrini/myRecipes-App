import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Categoria} from '../../model/categoria.model';
import {RicettaService} from '../../services/ricetta.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

  private preferiti$: Observable<[]>;

  constructor(private ricService: RicettaService) { }

  ngOnInit() {
  }

}
