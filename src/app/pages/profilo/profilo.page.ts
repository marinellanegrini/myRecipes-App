import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {ModalController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
    private utente: Utente;

    constructor(private modController: ModalController,
                private utenteService: UtenteService) { }

  ngOnInit() {
      // uso il service utente qui per recuperare l'utente che ha dentro tutti i suoi commenti
      this.utenteService.getUtente().subscribe((utente) => {
          this.utente = utente;
      });

  }

  async modProfile() {
        const modal = await this.modController.create({
            component: ModificaprofiloPage,
            componentProps: {appParam: this.utente}
        });

        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
          if (detail !== null && detail.data !== undefined) {
              // chiamata a utente service che deve fare update di utente verso il server
              // e poi aggiorno l'attributo utente sempre col service
              this.utente = detail.data;

          }
      });
        await modal.present();
  }

}
