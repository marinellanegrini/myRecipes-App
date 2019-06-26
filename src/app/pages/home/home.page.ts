import { Component, OnInit } from '@angular/core';
import {Ricetta} from '../../model/ricetta.model';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {RicettaService} from '../../services/ricetta.service';
import {UtenteService} from "../../services/utente.service";
import {Data} from "../../utility/Data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private ricettelista$: Observable<Ricetta[]>;
  private ricetteslide$: Observable<Ricetta[]>;

  constructor(private navController: NavController,
              private ricettaService: RicettaService,
              private utenteService: UtenteService,
              private data: Data,
              private router: Router) { }

  ngOnInit() {
    this.ricettelista$ = this.ricettaService.list(9);
    this.ricetteslide$ = this.ricettaService.list(3);
  }
  ricerca() {
    this.navController.navigateForward('ricerca');
  }

  onSubmitNome( data ) {
    if (data.value !== '') {
      this.ricettaService.ricercaPerNome(data.value).subscribe((Ricette) => {
        this.data.storage = Ricette;
        data.value = '';
        this.router.navigate(['/risultatiricerca']);
      });
    }
  }

}
