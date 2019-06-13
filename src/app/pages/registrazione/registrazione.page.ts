import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from "../../utility/confirm-password.validator";

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  private regForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
        Validators.pattern('[A-Za-z]$')
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

}
