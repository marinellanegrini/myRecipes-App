import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Ricetta} from '../../model/ricetta.model';
import {Data} from '../../utility/Data';
import {RicettaService} from '../../services/ricetta.service';

@Component({
  selector: 'app-risultatiricerca',
  templateUrl: './risultatiricerca.page.html',
  styleUrls: ['./risultatiricerca.page.scss'],
})
export class RisultatiricercaPage implements OnInit {
  private risultati: Ricetta[];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private ricService: RicettaService,
              private data: Data) {
  }

  ngOnInit() {
    this.risultati = this.data.storage;
  }

}
