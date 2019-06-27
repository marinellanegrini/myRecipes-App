import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';
import {BehaviorSubject} from 'rxjs';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {Ricetta} from '../../model/ricetta.model';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
    private utente: Utente;
    private commenti: Commento[];
    private title: string;
    private subtitle: string;
    private si: string;
    private no: string;

    constructor(private modController: ModalController,
                private navController: NavController,
                private utenteService: UtenteService,
                private alertController: AlertController,
                private translateService: TranslateService) { }


  ngOnInit() {
        this.utenteService.getUtente().subscribe((utente: Utente) => {
      this.utente = utente;
  });
        this.initTranslate();
  }

   ionViewWillEnter() {
    }

  Logout() {
        this.utenteService.logout();
        this.navController.navigateRoot('tabs/home');
  }

  async modProfile() {
        const modal = await this.modController.create({
            component: ModificaprofiloPage,
            componentProps: {appParam: this.utente}
        });

        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
          if (detail !== null && detail.data !== undefined) {
              this.utente = detail.data;
              this.utenteService.updateProfilo(this.utente).subscribe( (nuovoUtente) => {
                  this.utente = nuovoUtente;
              });

          }
      });
        await modal.present();
  }


    listcommenti() {
        // recupero i preferiti dall'utente tramite il service che recupera l'utente dallo storage
        this.utenteService.getUtente().subscribe((utente) => {
            this.commenti = utente.commento; // oltre a riempire i campi l'utente è messo come attributo
        });
    }
    ionViewWillEnterComm() {
        this.listcommenti();
    }



    async rimuoviComm(idcommento) {
        const alert = await this.alertController.create({
            header: this.title,
            message: this.subtitle,
            buttons: [this.no, {
                text: this.si,
                handler: () => {
                    this.utenteService.rimuoviCommento(idcommento);
                    this.listcommenti();
                }
            }]
        });

        await alert.present();
    }

    private initTranslate() {
        this.translateService.get('COM_CANC_SUBTITLE').subscribe((data) => {
            this.subtitle = data;
        });
        this.translateService.get('COM_CANC_TITLE').subscribe((data) => {
            this.title = data;
        });
        this.translateService.get('SI').subscribe((data) => {
            this.si = data;
        });
        this.translateService.get('NO').subscribe((data) => {
            this.no = data;
        });
    }
}
