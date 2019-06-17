import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";
import {UtenteService} from "../../services/utente.service";

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  private regForm: FormGroup;
  private esisteUsername: boolean;

  constructor(private fb: FormBuilder,
              private utenteService: UtenteService) { }

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
    const dati = this.regForm.value;

  }

  usernameChanged(data): void {
    if (data.value !== '') {
      this.utenteService.verifyUsername(data.value).subscribe((esito) => {
        this.esisteUsername = esito;
      });
    }
  }

}
