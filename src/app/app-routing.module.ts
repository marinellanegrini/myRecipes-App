import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  { path: '', redirectTo: 'preferiti', pathMatch: 'full' },
  { path: 'preferiti', loadChildren: './pages/preferiti/preferiti.module#PreferitiPageModule'},
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
