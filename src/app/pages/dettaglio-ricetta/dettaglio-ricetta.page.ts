import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

import {AlertController, ModalController, NavController} from '@ionic/angular';



@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.page.html',
  styleUrls: ['./dettaglio-ricetta.page.scss'],
})
export class DettaglioRicettaPage implements OnInit {
  private ricetta: Ricetta;
  private utente: Utente;
  private preferita: boolean;

  constructor(private route: ActivatedRoute,
              private modController: ModalController,
              private ricService: RicettaService,
              private utenteService: UtenteService,
              private navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
      this.route.paramMap.subscribe((params: ParamMap) => {
          // chiamata REST che recupera dal server la ricetta di cui ho l'id
         // this.ricetta$ = this.ricService.findById(parseInt(params.get('id'), 0));
          this.ricService.findById(parseInt(params.get('id'), 0)).subscribe( (ricetta) => {
              this.ricetta = ricetta;
              for (const comm of ricetta.commenti) {
                  this.utenteService.findById(comm.idutente).subscribe((utente) => {
                      comm.username = utente.username;
                      comm.immagineutente = utente.immagine;
                  });
              }
              this.utenteService.getUtente().subscribe((utente) => {
                          if (utente !== undefined && utente !== null) {
                              this.utente = utente;
                              this.utenteService.isLogged().subscribe((logged: boolean) => {
                                  if (logged && this.utente.preferito !== null) {
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

  }

 rimuoviPref() {
     this.utenteService.rimuoviDaPreferiti(this.ricetta.id);
     this.preferita = false;
  /* this.ricetta$.subscribe( (ricetta) => {
     // chiamata al server per aggiornare l'utente
     this.utenteService.rimuoviDaPreferiti(ricetta.id);
     this.preferita = false;
   });*/
 }

  aggiungiPref() {
      this.utenteService.isLogged().subscribe( (logged) => {
          if (logged) {
              // chiamata al server per aggiornare l'utente
              this.utenteService.aggiungiAPreferiti(this.ricetta.id);
              this.preferita = true;
          } else {
              this.navController.navigateForward('login');
          }
      });
  }



   /* async commenta() {
      this.utenteService.isLogged().subscribe( async (logged) => {
          if (logged) {
              const modal = await this.modController.create({

                  component: CommentoPage
              });

              modal.onDidDismiss().then((detail: OverlayEventDetail) => {
                  if (detail !== null && detail.data !== undefined) {
                      const commento: Commento = detail.data;
                      commento.idricetta = this.ricetta.id;
                      this.utenteService.commenta(commento).subscribe(() => {
                           this.ricService.findById(this.ricetta.id).subscribe( (ricetta) => {
                              this.ricetta = ricetta;
                              for (const comm of ricetta.commenti) {
                                   this.utenteService.findById(comm.idutente).subscribe((utente) => {
                                       comm.username = utente.username;
                                       comm.immagineutente = utente.immagine;
                                   });
                               }
                              this.utenteService.getUtente().subscribe((utente) => {
                                       if (utente !== undefined && utente !== null) {
                                           this.utente = utente;
                                           this.utenteService.isLogged().subscribe( (logged: boolean) => {
                                               if (logged && this.utente.preferito !== null) {
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
                      }, (err: HttpErrorResponse) => {
                          if (err.status === 500) {
                              this.showComError();
                          }
                      });
                  }
              });
              await modal.present();

          } else {
              this.navController.navigateRoot('login');
          } else {
              this.commenta();

          }
      });

    }*/
}
