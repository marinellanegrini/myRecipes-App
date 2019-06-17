import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-commento',
  templateUrl: './commento.page.html',
  styleUrls: ['./commento.page.scss'],
})
export class CommentoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async Cancel() {
    await this.modalController.dismiss();
  }

  async Submit() {
  }

}
