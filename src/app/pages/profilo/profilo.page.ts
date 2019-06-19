import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {ModalController, NavController} from '@ionic/angular';
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
                private navController: NavController,
                private utenteService: UtenteService) { }

  ngOnInit() {this.utenteService.getUtente().subscribe((utente: Utente) => {
      this.utente = utente;
  });
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

}
