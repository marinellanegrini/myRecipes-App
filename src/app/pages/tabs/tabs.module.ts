import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {AuthGuard} from "../../guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule',
          }
        ]
      },
      {
        path: 'preferiti',
        children: [
          {
            path: '',
            loadChildren: '../preferiti/preferiti.module#PreferitiPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../profilo/profilo.module#ProfiloPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
