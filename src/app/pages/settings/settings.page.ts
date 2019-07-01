import { Component, OnInit } from '@angular/core';
import {Lingua, LinguaService} from "../../../services/lingua.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AlertController, NavController} from "@ionic/angular";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";
import {Utente} from "../../model/utente.model";
import {Commento} from "../../model/commento.model";
import { DatePipe } from '@angular/common';
import {AppVersion} from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  providers: [DatePipe],
})
export class SettingsPage implements OnInit {
  private utente: Utente;
  private lingue: Lingua[];
  private settingForm: FormGroup;
  private appVer: string;

  private errorTitle: string;
  private errorSubTitle: string;


  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private navController: NavController,
              private appVersion: AppVersion
              ) { }

  ngOnInit() {


    this.lingue = this.linguaService.getLingue();
    this.settingForm = this.fb.group({
      linguaPreferita: ['', Validators.compose([
        Validators.required])],
    });

    this.linguaService.getLinguaAttuale().subscribe((lingua) => {
      this.settingForm.patchValue({linguaPreferita: lingua}); // con patchValue posso impostare un singolo campo della from
    });

    this.appVersion.getVersionNumber().then( (vnumber) => {
      this.appVer = vnumber;
    });

    this.initTranslate();

  }

  Submit(): void {
    // devo recuperare tutti i dati dalla form e aggiorno
    this.translateService.use(this.settingForm.value.linguaPreferita);
    this.linguaService.updateLingua(this.settingForm.value.linguaPreferita);

    this.navController.back();
  }

  Cancel() {
    this.navController.back();
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.errorTitle,
      message: this.errorSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }

  private initTranslate() {
    this.translateService.get('PASS-ERR-SUBTITLE').subscribe((data) => {
      this.errorSubTitle = data;
    });
    this.translateService.get('PASS-ERR-TITLE').subscribe((data) => {
      this.errorTitle = data;
    });
  }


}
