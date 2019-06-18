import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';
import {ModalController, NavController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {CommentoPage} from '../commento/commento.page';


@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.page.html',
  styleUrls: ['./dettaglio-ricetta.page.scss'],
})
export class DettaglioRicettaPage implements OnInit {
  private ricetta$: Observable<Ricetta>;
  private utente: Utente;
  private preferita: boolean;

  constructor(private route: ActivatedRoute,
              private modController: ModalController,
              private ricService: RicettaService,
              private utenteService: UtenteService,
              private navController: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // chiamata REST che recupera dal server la ricetta di cui ho l'id
      this.ricetta$ = this.ricService.findById(parseInt(params.get('id'), 0));
      this.ricetta$.subscribe( (ricetta) => {
        this.utenteService.getUtente().subscribe((utente) => {
          if (utente !== undefined && utente !== null) {
            this.utente = utente;
            this.utenteService.isLogged().subscribe( (logged: boolean) => {
              if (logged) {
                const pref: Ricetta[] = this.utente.preferito;
                const i: number[] = [];
                for (const ric of pref) {
                  i.push(ric.id);
                }
                if (i.includes(ricetta.id)) {
                  this.preferita = true;
                } else {
                  this.preferita = false;
                }
              } else {
                this.preferita = false;
              }
            });
          } else {
            this.preferita = false;
          }
        }
        );
      });

    });

    /*this.utenteService.getUtente().subscribe((utente) => {
        this.utente = utente;
    });*/
    // NB usare il service qui per recuperare gli utenti relativi ai commenti della ricetta
  }

 rimuoviPref() {
   this.ricetta$.subscribe( (ricetta) => {
     // chiamata al server per aggiornare l'utente
     this.ricService.rimuoviDaPreferiti(ricetta.id);
     this.preferita = false;
   });
 }

  aggiungiPref() {
      this.ricetta$.subscribe((ricetta) => {
          // chiamata al server per aggiornare l'utente
          this.ricService.aggiungiAPreferiti(ricetta.id);
          this.preferita = true;
      });
  }

   async commenta() {
      const modal = await this.modController.create({
            component: CommentoPage
      });

      modal.onDidDismiss().then((detail: OverlayEventDetail) => {
        if (detail !== null && detail.data !== undefined) {
            // chiamata a utente service che deve fare update di utente verso il server
            // e poi aggiorno l'attributo utente sempre col service
            const commento = detail.data;
            this.ricService.commento(commento);

      }
    });
      await modal.present();

  }

}
