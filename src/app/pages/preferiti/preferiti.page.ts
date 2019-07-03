import {Component, OnInit} from '@angular/core';
import {Ricetta} from "../../model/ricetta.model";
import {RicettaService} from "../../services/ricetta.service";
import {UtenteService} from "../../services/utente.service";

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

    private preferiti: Ricetta[];

  constructor(private ricService: RicettaService,
              private utenteService: UtenteService) { }
  ngOnInit() {
    }
    listpreferiti() {
    // recupero i preferiti dall'utente tramite il service che recupera l'utente dallo storage
       this.utenteService.getUtente().subscribe((utente) => {
          this.preferiti = utente.preferito; // oltre a riempire i campi l'utente è messo come attributo
        });
    }
    ionViewWillEnter() {
      this.listpreferiti();
    }


  rimuoviPref(idricetta) {

      this.utenteService.rimuoviDaPreferiti(idricetta);
      this.listpreferiti();
  }

}


