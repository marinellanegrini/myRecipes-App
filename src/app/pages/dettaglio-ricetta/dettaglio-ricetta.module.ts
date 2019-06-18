import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioRicettaPage } from './dettaglio-ricetta.page';
import {TranslateModule} from '@ngx-translate/core';
import {CommentoPageModule} from '../commento/commento.module';

const routes: Routes = [
  {
    path: '',
    component: DettaglioRicettaPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      TranslateModule.forChild(),
    CommentoPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettaglioRicettaPage]
})
export class DettaglioRicettaPageModule {}
