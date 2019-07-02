import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [

  { path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full' },
  { path: 'tabs',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule'},
  { path: 'risultatiricerca',
    loadChildren: './pages/risultatiricerca/risultatiricerca.module#RisultatiricercaPageModule' },
  { path: 'ricette/:id',
    loadChildren: './pages/dettaglio-ricetta/dettaglio-ricetta.module#DettaglioRicettaPageModule' },
  { path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registrazione',
    loadChildren: './pages/registrazione/registrazione.module#RegistrazionePageModule' },
  { path: 'ricerca',
    loadChildren: './pages/ricerca/ricerca.module#RicercaPageModule' },
  { path: 'commenta/:id', loadChildren: './pages/commenta/commenta.module#CommentaPageModule',
    canActivate: [AuthGuard]}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
