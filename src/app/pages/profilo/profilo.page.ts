import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {ModalController, NavController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';
import {BehaviorSubject} from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Immagine} from "../../model/immagine.model";


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
    private utente: Utente;
    private foto: string;

    constructor(private modController: ModalController,
                private navController: NavController,
                private utenteService: UtenteService,
                private camera: Camera) { }

    imageResponse: any;
    options: any;

  ngOnInit() {
  }

   ionViewWillEnter() {
       this.utenteService.getUtente().subscribe((utente: Utente) => {
           this.utente = utente;
       });
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


    changeImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            let foto =  imageData;
            let fotoobj = new Immagine();
            fotoobj.data = foto;
            fotoobj.type = 'image/jpeg';
            fotoobj.idesterno = this.utente.id;
            this.utenteService.updateFoto(fotoobj).subscribe( (nuovoUtente) => {
                this.utente = nuovoUtente;
            });

        }, (err) => {
            // Handle error
        });

    }

}
