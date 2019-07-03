import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {ConfirmPasswordValidator} from '../../utility/confirm-password.validator';
import {UtenteService} from "../../services/utente.service";
@Component({
  selector: 'app-modificaprofilo',
  templateUrl: './modificaprofilo.page.html',
  styleUrls: ['./modificaprofilo.page.scss'],
})
export class ModificaprofiloPage implements OnInit {

  constructor(private fb: FormBuilder,
              private utenteService: UtenteService,
              private modalController: ModalController,
              private navParams: NavParams) {
  }

  private utente: Utente;
  private modForm: FormGroup;

  private esisteUsername: boolean;


  ngOnInit() {
    this.utente = this.navParams.data.appParam;
    this.modForm = this.fb.group({
      username: [this.utente.username],
      nome: [this.utente.nome, Validators.pattern('[A-Za-z]+')],
      cognome: [this.utente.cognome, Validators.pattern('[A-Za-z]+')],
      email: [this.utente.email, Validators.email],
      password: [this.utente.password],
      confpassword: [this.utente.password]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });

  }

  async Cancel() {
    await this.modalController.dismiss();
  }

  async Submit() {
    // prendo i valori dalla form e li metto in utente
    this.utente.username = this.modForm.value.username;
    this.utente.nome = this.modForm.value.nome;
    this.utente.cognome = this.modForm.value.cognome;
    this.utente.email = this.modForm.value.email;
    if (this.modForm.value.password !== '') {
      this.utente.password = this.modForm.value.password;
    }
    await this.modalController.dismiss(this.utente);
  }


  usernameChanged(data): void {
    if (data.value !== '') {
      this.utenteService.verifyUsername(data.value).subscribe((esito) => {
        this.esisteUsername = esito;
      });
    }
  }
}
