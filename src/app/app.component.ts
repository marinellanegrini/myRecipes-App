import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LinguaService} from '../services/lingua.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private linguaService: LinguaService, // devo iniettare il service della lingua (definito da noi per recuperare la lingua dal db)
    // e il service per la traduzione
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initTranslate();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  initTranslate() { // configuro la lingua dialogando con lo storage tramite il service della lingua
    // Set the default language for translation strings, and the current language.
    const linguaPreferita = this.linguaService.getLinguaPreferita(); // ritorna 'it'
    this.translate.setDefaultLang(linguaPreferita); // imposta 'it' come lingua di default
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => { // al posto di then uso subscribe (observable)
      if (lingua != null) { // è null la prima volta che installiamo l'app
        this.translate.use(lingua); // automaticamente cerca le traduzioni nel file json relativo (es. it.json)
      } else {
        this.translate.use(linguaPreferita);
        this.linguaService.updateLingua(linguaPreferita); // la prima volta salvo nello storage la lingua preferita
      }
    });
  }
}
