import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Commento} from '../../model/commento.model';
import {ActionSheetController, AlertController, ModalController, NavController} from '@ionic/angular';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {OverlayEventDetail} from '@ionic/core/dist/types/utils/overlays-interface';
import {TranslateService} from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Immagine} from '../../model/immagine.model';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {
    private utente: Utente;
    private commenti: Commento[];
    private titlecom: string;
    private subtitlecom: string;
    private si: string;
    private no: string;
    private headerAction: string;
    private Camera: string;
    private Gallery: string;
    private annulla: string;

    constructor(private modController: ModalController,
                private navController: NavController,
                private utenteService: UtenteService,
                private alertController: AlertController,
                private translateService: TranslateService,
                private camera: Camera,
                public actionSheetController: ActionSheetController) { }


  ngOnInit() {
        this.initTranslate();
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
    listcommenti() {
        // recupero i commenti dall'utente tramite il service che recupera l'utente dallo storage
        this.utenteService.getUtente().subscribe((utente) => {
            this.commenti = utente.commento;
        });
    }

    ionViewWillEnterComm() {
        this.listcommenti();
    }

    changeImageCamera() {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            const foto = imageData;
            const fotoobj = new Immagine();
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
    changeImageGallery() {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            const foto = imageData;
            const fotoobj = new Immagine();
            fotoobj.data = foto;
            fotoobj.type = 'image/jpeg';
            fotoobj.idesterno = this.utente.id;
            this.utenteService.updateFoto(fotoobj).subscribe((nuovoUtente) => {
                this.utente = nuovoUtente;
            });

        }, (err) => {
            // Handle error

        });
    }

    async rimuoviComm(idcommento) {
        const alert = await this.alertController.create({
            header: this.titlecom,
            message: this.subtitlecom,
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

    async openActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: this.headerAction,
            buttons: [{
                text: this.Gallery,
                handler: () => {this.changeImageGallery(); }
            }, {
                text: this.Camera,
                handler: () => {this.changeImageCamera(); }
            }, {
                text: this.annulla,
                role: 'cancel',
                handler: () => {
                }
            }]
        });
        await actionSheet.present();
    }
    private initTranslate() {
        this.translateService.get('COM_CANC_SUBTITLE').subscribe((data) => {
            this.subtitlecom = data;
        });
        this.translateService.get('COM_CANC_TITLE').subscribe((data) => {
            this.titlecom = data;
        });
        this.translateService.get('SI').subscribe((data) => {
            this.si = data;
        });
        this.translateService.get('NO').subscribe((data) => {
            this.no = data;
        });
        this.translateService.get('HEADER-ACTION').subscribe((data) => {
            this.headerAction = data;
        });
        this.translateService.get('CAMERA').subscribe((data) => {
            this.Camera = data;
        });
        this.translateService.get('GALLERY').subscribe((data) => {
            this.Gallery = data;
        });
        this.translateService.get('ANNULLA').subscribe((data) => {
            this.annulla = data;
        });
    }

}
