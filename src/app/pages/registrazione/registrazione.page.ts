import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";
import {UtenteService} from "../../services/utente.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertController, NavController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {Utente} from "../../model/utente.model";
import {PreviousRouteService} from '../../utility/prevroute';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  private regForm: FormGroup;
  private esisteUsername: boolean;

  private regTitle: string;
  private regSubTitle: string;

  constructor(private fb: FormBuilder,
              private utenteService: UtenteService,
              private translateService: TranslateService,
              private alertController: AlertController,
              private navController: NavController,
              private previousRouteService: PreviousRouteService) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      nome: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z]+')
      ])],
      cognome: ['',  Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z]+')
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [''],
      confpassword: ['']
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
    this.initTranslate();
  }
  registrati() {
    const u = new Utente();
    u.email = this.regForm.value.email;
    u.username = this.regForm.value.username;
    u.nome = this.regForm.value.nome;
    u.cognome = this.regForm.value.cognome;
    u.password = this.regForm.value.password;
    this.utenteService.registrazione(u).subscribe((nuovoUtente: Utente) => {
          this.regForm.reset();
          this.navController.navigateRoot('login');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 500) {
            this.showRegError();
          }});
  }

  async showRegError() {
    const alert = await this.alertController.create({
      header: this.regTitle, // sono attributi di login.page.ts popolati nella initTranslate() a seconda della lingua
      message: this.regSubTitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  private initTranslate() {
    this.translateService.get('REG_ERROR_SUB_TITLE').subscribe((data) => {
      this.regSubTitle = data;
    });
    this.translateService.get('REG_ERROR_TITLE').subscribe((data) => {
      this.regTitle = data;
    });
  }

  usernameChanged(data): void {
    if (data.value !== '') {
      this.utenteService.verifyUsername(data.value).subscribe((esito) => {
        this.esisteUsername = esito;
      });
    }
  }

}
