import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModificaprofiloPage } from './modificaprofilo.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ModificaprofiloPage
  }
];

@NgModule({
    entryComponents: [ModificaprofiloPage],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        IonicModule,
    ],
  declarations: [ModificaprofiloPage]
})
export class ModificaprofiloPageModule {}
