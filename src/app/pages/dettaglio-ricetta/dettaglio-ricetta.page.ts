import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.page.html',
  styleUrls: ['./dettaglio-ricetta.page.scss'],
})
export class DettaglioRicettaPage implements OnInit {
  private ricetta$: Observable<Ricetta>;
  private utente: Utente;

  constructor(private route: ActivatedRoute,
              private ricService: RicettaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // chiamata REST che recupera dal server la ricetta di cui ho l'id
      this.ricetta$ = this.ricService.findById(parseInt(params.get('id'), 0));
    });

    /*this.utenteService.getUtente().subscribe((utente) => {
        this.utente = utente;
    });*/
    // NB usare il service qui per recuperare gli utenti relativi ai commenti della ricetta
    let u = new Utente();
    u.username = 'mari';
    this.utente = u;
  }

}
