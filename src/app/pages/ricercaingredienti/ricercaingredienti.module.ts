import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RicercaingredientiPage } from './ricercaingredienti.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: RicercaingredientiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [RicercaingredientiPage]
})
export class RicercaingredientiPageModule {}
