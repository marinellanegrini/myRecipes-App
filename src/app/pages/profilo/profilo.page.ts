import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {ModalController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
    private utente: Utente;

    constructor(private modController: ModalController) { }

  ngOnInit() {
      // uso il service utente qui per recuperare l'utente che ha dentro tutti i suoi commenti
      let u = new Utente();
      u.username = 'mari';
      u.password = 'pippo';
      u.nome = 'Marinella';
      u.cognome = 'Negrini';
      u.email = 'mari@gmailcom';
      u.stato = true;
      let c: Commento = new Commento();
      c.id = 1;
      c.bannato = false;
      c.data = new Date(2019, 12, 2);
      c.ora = new Date(2);
      c.idricetta = 1;
      c.testo = 'bella ricetta';
      c.idutente = 1;
      u.commenti = [c];
      this.utente = u;

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
