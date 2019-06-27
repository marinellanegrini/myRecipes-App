import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {ModalController, NavController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';
import {BehaviorSubject} from 'rxjs';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
    private utente: Utente;

    constructor(private modController: ModalController,
                private navController: NavController,
                private utenteService: UtenteService,
                private imagePicker: ImagePicker) { }

    imageResponse: any;
    options: any;

  ngOnInit() {
        this.utenteService.getUtente().subscribe((utente: Utente) => {
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


    getImage() {
        this.options = {
            // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
            // selection of a single image, the plugin will return it.
            //maximumImagesCount: 3,

            // max width and height to allow the images to be.  Will keep aspect
            // ratio no matter what.  So if both are 800, the returned image
            // will be at most 800 pixels wide and 800 pixels tall.  If the width is
            // 800 and height 0 the image will be 800 pixels wide if the source
            // is at least that wide.
            width: 200,
            //height: 200,

            // quality of resized image, defaults to 100
            quality: 25,

            // output type, defaults to FILE_URIs.
            // available options are
            // window.imagePicker.OutputType.FILE_URI (0) or
            // window.imagePicker.OutputType.BASE64_STRING (1)
            outputType: 1
        };
        this.imageResponse = [];
        this.imagePicker.getPictures(this.options).then((results) => {
                this.imageResponse.push('data:image/jpeg;base64,' + results);
        }, (err) => {
            alert(err);
        });
    }

    async modImgProfilo() {}
}
