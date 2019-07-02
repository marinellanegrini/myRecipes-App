import { Component, OnInit } from '@angular/core';
import {Lingua, LinguaService} from "../../../services/lingua.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AlertController, NavController} from "@ionic/angular";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";
import {Utente} from "../../model/utente.model";
import {Commento} from "../../model/commento.model";
import { DatePipe } from '@angular/common';

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


  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private navController: NavController,
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
}
