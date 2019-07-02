import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentaPage } from './commenta.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CommentaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DatePipe
  ],
  declarations: [CommentaPage]
})
export class CommentaPageModule {}
