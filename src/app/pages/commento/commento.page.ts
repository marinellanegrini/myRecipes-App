import { Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Commento} from '../../model/commento.model';
import { DatePipe } from '@angular/common';
import {CommentoPageModule} from './commento.module';

@Component({

  selector: 'app-commento',
  templateUrl: './commento.page.html',
  styleUrls: ['./commento.page.scss'],
})


export class CommentoPage implements OnInit {

  private comForm: FormGroup;


  constructor(private fb: FormBuilder,
              private modalController: ModalController,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.comForm = this.fb.group({
      testo: [Validators.required]
    });
  }

  async Cancel() {
    await this.modalController.dismiss();
  }

  async Submit() {
    const commento = new Commento();
    commento.testo = this.comForm.value.testo;
    commento.data = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    commento.ora = this.datePipe.transform(Date.now(), 'H:mm:ss');
    await this.modalController.dismiss(commento);
  }

}
