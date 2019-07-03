import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {Account, UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import {PreviousRouteService} from '../../utility/prevroute';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private formLogin: FormGroup;
  private previousPath;
  private loginTitle: string;
  private loginSubTitle: string;

  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private translateService: TranslateService,
              private navController: NavController,
              private utenteService: UtenteService,
              public router: Router,
              private previousRouteService: PreviousRouteService) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.initTranslate();
  }

  ionViewWillEnter() {
    this.previousPath = this.previousRouteService.getPreviousUrl();
  }

  onLogin() {
    const account: Account = this.formLogin.value;
    this.utenteService.login(account).subscribe((utente: Utente) => { // this.utenteService.login(account) torna un Observable<Utente>
          this.formLogin.reset();
          if (this.previousPath === '/registrazione') {
            this.navController.navigateRoot('tabs/home');
          } else {
             this.navController.back();
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.showLoginError();
          }
        });
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle, // sono attributi di login.page.ts popolati nella initTranslate() a seconda della lingua
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }

  private initTranslate() {
    this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
      this.loginSubTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
      this.loginTitle = data;
    });
  }
  register() {
    this.navController.navigateForward('registrazione');
  }

}
