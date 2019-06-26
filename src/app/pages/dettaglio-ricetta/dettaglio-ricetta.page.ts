import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';

import {AlertController, ModalController, NavController} from '@ionic/angular';
import {ModificaprofiloPage} from "../modificaprofilo/modificaprofilo.page";
import {CommentoPage} from '../commento/commento.page';

import {Commento} from '../../model/commento.model';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.page.html',
  styleUrls: ['./dettaglio-ricetta.page.scss'],
})
export class DettaglioRicettaPage implements OnInit {
  private ricetta$: Observable<Ricetta>;
  private utente: Utente;
  private preferita: boolean;
  private utentiCommenti: Utente[] = [];

    private comTitle: string;
    private comSubTitle: string;

  constructor(private route: ActivatedRoute,
              private modController: ModalController,
              private ricService: RicettaService,
              private utenteService: UtenteService,
              private translateService: TranslateService,
              private alertController: AlertController,
              private navController: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
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
      // per ogni idutente di ogni commento recupero dal server l'utente e lo metto nell'array utenteCommenti
      this.ricetta$.subscribe( (ricetta) => {
          const i: number[] = [];
          for (const comm of ricetta.commenti) {
              i.push(comm.idutente);
          }
          for (const id of i) {
              this.utenteService.findById(id).subscribe( (utente) => {
                  this.utentiCommenti.push(utente);
              });
          }
      });
      /*this.utenteService.getUtente().subscribe((utente) => {
          this.utente = utente;
      });*/
      // NB usare il service qui per recuperare gli utenti relativi ai commenti della ricetta


      this.initTranslate();

  }

 rimuoviPref() {
   this.ricetta$.subscribe( (ricetta) => {
     // chiamata al server per aggiornare l'utente
     this.utenteService.rimuoviDaPreferiti(ricetta.id);
     this.preferita = false;
   });
 }

  aggiungiPref() {
      this.ricetta$.subscribe((ricetta) => {
          this.utenteService.isLogged().subscribe( (logged) => {
              if (logged) {
                  // chiamata al server per aggiornare l'utente
                  this.utenteService.aggiungiAPreferiti(ricetta.id);
                  this.preferita = true;
              } else {
                  this.navController.navigateRoot('login');
              }
          });
      });
  }



    async commenta() {
      this.utenteService.isLogged().subscribe( async (logged) => {
          if (logged) {
              const modal = await this.modController.create({

                  component: CommentoPage
              });

              modal.onDidDismiss().then((detail: OverlayEventDetail) => {
                  if (detail !== null && detail.data !== undefined) {
                      const commento: Commento = detail.data;
                      this.ricetta$.subscribe((ricetta) => {
                          commento.idricetta = ricetta.id;
                          this.utenteService.commenta(commento).subscribe(() => {
                              this.ricetta$ = this.ricService.findById(ricetta.id);
                          }, (err: HttpErrorResponse) => {
                              if (err.status === 500) {
                                  this.showComError();
                              }
                          });
                      });
                  }
              });
              await modal.present();

          } else {
              this.navController.navigateRoot('login');
          }
      });
    }

    async showComError() {
        const alert = await this.alertController.create({
            header: this.comTitle,
            message: this.comSubTitle,
            buttons: ['OK']
        });
        await alert.present();
    }

    private initTranslate() {
        this.translateService.get('COM_ERROR_SUB_TITLE').subscribe((data) => {
            this.comSubTitle = data;
        });
        this.translateService.get('COM_ERROR_TITLE').subscribe((data) => {
            this.comTitle = data;
        });
    }
}
