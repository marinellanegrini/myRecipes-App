import { Component, OnInit } from '@angular/core';
import {Ricetta} from '../../model/ricetta.model';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {RicettaService} from '../../services/ricetta.service';
import {UtenteService} from "../../services/utente.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private ricette$: Observable<Ricetta[]>

  constructor(private navController: NavController,
              private ricettaService: RicettaService,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.ricette$ = this.ricettaService.list();
  }
  ricerca() {
    this.navController.navigateForward('ricerca');
  }

}
