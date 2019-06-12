import { Component, OnInit } from '@angular/core';
import {Lingua, LinguaService} from "../../../services/lingua.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AlertController, NavController} from "@ionic/angular";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";
import {Utente} from "../../model/utente.model";
import {Commento} from "../../model/commento.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private utente: Utente;
  private lingue: Lingua[];
  private settingForm: FormGroup;

  private errorTitle: string;
  private errorSubTitle: string;

  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private navController: NavController) { }

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


    this.lingue = this.linguaService.getLingue();
    this.settingForm = this.fb.group({
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])],
      oldpassword: [''],
      password: [''],
      confpassword: ['']
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });

    this.linguaService.getLinguaAttuale().subscribe((lingua) => {
      this.settingForm.patchValue({linguaPreferita: lingua}); // con patchValue posso impostare un singolo campo della from
    });

    this.initTranslate();

  }

  Submit(): void {
    // devo recuperare tutti i dati dalla form e aggiorno
    this.translateService.use(this.settingForm.value.linguaPreferita);
    this.linguaService.updateLingua(this.settingForm.value.linguaPreferita);
    if (this.settingForm.value.oldpassword !== this.utente.password
        && this.settingForm.value.oldpassword !== '' && this.settingForm.value.oldpassword !== null) {
      this.showLoginError();
    } else {
      this.utente.password = this.settingForm.value.password;
      console.log(this.utente.password);
      // aggiornare il server
      this.navController.back();
    }
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
