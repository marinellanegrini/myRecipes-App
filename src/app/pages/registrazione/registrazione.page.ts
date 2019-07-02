import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";
import {UtenteService} from "../../services/utente.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertController, NavController} from "@ionic/angular";
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

  constructor(private fb: FormBuilder,
              private utenteService: UtenteService,
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
          this.navController.navigateForward('login');
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
