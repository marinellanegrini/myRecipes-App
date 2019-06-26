import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {ConfirmPasswordValidator} from '../../utility/confirm-password.validator';
@Component({
  selector: 'app-modificaprofilo',
  templateUrl: './modificaprofilo.page.html',
  styleUrls: ['./modificaprofilo.page.scss'],
})
export class ModificaprofiloPage implements OnInit {

  constructor(private fb: FormBuilder,
              private modalController: ModalController,
              private navParams: NavParams) {
  }

  private utente: Utente;
  private modForm: FormGroup;
  imageResponse: any;
  options: any;

  ngOnInit() {
    this.utente = this.navParams.data.appParam;
    this.modForm = this.fb.group({
      username: [this.utente.username],
      nome: [this.utente.nome, Validators.pattern('[A-Za-z]+')],
      cognome: [this.utente.cognome,  Validators.pattern('[A-Za-z]+')],
      email: [this.utente.email, Validators.email],
      password: [''],
      confpassword: ['']
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
      this.utente.password =  this.modForm.value.password;
    }
    await this.modalController.dismiss(this.utente);
  }
/*
  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      this.imageResponse.push('data:image/jpeg;base64,');
    }, (err) => {
      alert(err);
    });
  }

  getImage() {

    this.imagePicker.getPictures(this.options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
    });
  }*/
}
