import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: './pages/ricerca/ricerca.module#RicercaPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
