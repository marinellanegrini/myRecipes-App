import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {Account, UtenteService} from "../../services/utente.service";
import {Utente} from "../../model/utente.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private formLogin: FormGroup;

  constructor(private fb: FormBuilder,
              private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  onLogin() {
    const account: Account = this.formLogin.value;
    this.utenteService.login(account).subscribe((utente: Utente) => { // this.utenteService.login(account) torna un Observable<Utente>
          this.formLogin.reset();
          this.navController.navigateRoot('tabs');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
          }
        });
  }

  /*onLogin() {
    this.navController.navigateRoot('tabs');
  }*/

  register() {
    this.navController.navigateRoot('registrazione');
  }

}
