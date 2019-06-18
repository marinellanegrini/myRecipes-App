import {AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';

import {Observable} from "rxjs";
import {Cibo} from "../../model/cibo.model";
import {Ricetta} from "../../model/ricetta.model";
import {RicettaService} from "../../services/ricetta.service";

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

    private preferiti$: Observable<Ricetta[]>;

  constructor(private ricService: RicettaService) { }
  ngOnInit() {
    }
    listpreferiti() {
        this.preferiti$ = this.ricService.preferiti();
    }
    ionViewWillEnter() {
      this.listpreferiti();
    }

}
