import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentoPage } from './commento.page';
import {TranslateModule} from '@ngx-translate/core';
import {ModificaprofiloPage} from '../modificaprofilo/modificaprofilo.page';
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CommentoPage
  }
];

@NgModule({
    entryComponents: [CommentoPage],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        IonicModule,
    ],
    providers: [
        DatePipe
    ],
  declarations: [CommentoPage]
})
export class CommentoPageModule {}
