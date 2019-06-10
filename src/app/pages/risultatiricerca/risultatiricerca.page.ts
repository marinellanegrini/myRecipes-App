import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ricetta} from '../../model/ricetta.model';
import {Observable} from 'rxjs';
import {RicettaService} from '../../services/ricetta.service';

@Component({
  selector: 'app-risultatiricerca',
  templateUrl: './risultatiricerca.page.html',
  styleUrls: ['./risultatiricerca.page.scss'],
})
export class RisultatiricercaPage implements OnInit {
  private risultati$: Observable<Ricetta[]>

  constructor(public activatedRoute: ActivatedRoute,
              private ricService: RicettaService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.risultati$ = this.ricService.ricercaAvanzata(res);
    });
  }

}
