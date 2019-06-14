import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UtenteService} from '../services/utente.service';
import {X_AUTH} from '../constants';
import {AlertController, NavController} from '@ionic/angular';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private navController: NavController,
                private alertController: AlertController,
                private utenteService: UtenteService) {
    }

    // fa si che in ogni richiesta che esce ci sia un token nell'header
    intercept(req: HttpRequest<any>, next: HttpHandler) { // metodo eseguito ogni volta che facciamo la chiamata, prende
        // come parametro req, che identifica la richiesta
        // Get the auth token from the service.
        const authToken = this.utenteService.getAuthToken();
        if (authToken !== null && authToken !== undefined && authToken !== '') {
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            const authReq = req.clone({ // NB: req va clonato mettendo il token nell'header di richiesta
                headers: req.headers.set(X_AUTH, `Bearer ${authToken}`)
            });
            return next.handle(authReq).pipe(
                catchError(err => {
                    this.showError(err);
                    return EMPTY;
                })
            );
        } else {
            return next.handle(req);
        }

    }

    async showError(err: HttpErrorResponse) {
        const errorMessage = `Status: ${err.status}, Message: ${err.message}`;

        const alert = await this.alertController.create({
            header: 'Errore',
            message: errorMessage,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navController.navigateRoot('login');
                    }
                }
            ]
        });

        await alert.present();
    }
}
