import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private formLogin: FormGroup;

  constructor(private fb: FormBuilder,
              private navController: NavController) { }

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

  /*onLogin() {
    const account: Account = this.loginFormModel.value;
    this.utenteService.login(account).subscribe((utente: Utente) => { // this.utenteService.login(account) torna un Observable<Utente>
          this.loginFormModel.reset();
          this.navController.navigateRoot('tabs');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        });
  }*/

  onLogin() {
    this.navController.navigateRoot('tabs');
  }

  register() {
    this.navController.navigateRoot('registrazione');
  }

}
