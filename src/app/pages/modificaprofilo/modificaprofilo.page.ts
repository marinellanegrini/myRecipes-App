import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController, NavParams} from "@ionic/angular";
import {Utente} from "../../model/utente.model";

@Component({
  selector: 'app-modificaprofilo',
  templateUrl: './modificaprofilo.page.html',
  styleUrls: ['./modificaprofilo.page.scss'],
})
export class ModificaprofiloPage implements OnInit {

  constructor(private fb: FormBuilder,
              private modalController: ModalController,
              private navParams: NavParams) { }

  private utente: Utente;
  private modForm: FormGroup;
  file: File;

  ngOnInit() {
    this.utente = this.navParams.data.appParam;
    this.modForm = this.fb.group({
      username: [this.utente.username],
      nome: [this.utente.nome, Validators.pattern('[A-Za-z]+')],
      cognome: [this.utente.cognome,  Validators.pattern('[A-Za-z]+')],
      email: [this.utente.email, Validators.email]
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
    await this.modalController.dismiss(this.utente);
  }

}
