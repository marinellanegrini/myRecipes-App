import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.page.html',
  styleUrls: ['./dettaglio-ricetta.page.scss'],
})
export class DettaglioRicettaPage implements OnInit {
  private ricetta$: Observable<Ricetta>;

  constructor(private route: ActivatedRoute,
              private ricService: RicettaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // chiamata REST che recupera dal server la ricetta di cui ho l'id
      this.ricetta$ = this.ricService.findById(parseInt(params.get('id'), 0));
    });
  }

}
