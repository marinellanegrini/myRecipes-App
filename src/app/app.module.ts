import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Data} from './utility/Data';
import {httpInterceptorProviders} from './interceptor';
import {PreviousRouteService} from './utility/prevroute';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot(
        { // fa in modo che i file json vengano cercati in src/assets/i18n
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }),
      IonicStorageModule.forRoot({name: '__mydb', driverOrder: ['indexeddb', 'sqlite', 'websql']}),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
      Data,
    PreviousRouteService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

