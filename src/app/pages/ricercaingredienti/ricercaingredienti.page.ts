import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {Cibo} from '../../model/cibo.model';
import {CiboService} from '../../services/cibo.service';

@Component({
  selector: 'app-ricercaingredienti',
  templateUrl: './ricercaingredienti.page.html',
  styleUrls: ['./ricercaingredienti.page.scss'],
})
export class RicercaingredientiPage implements OnInit {
  private cibi$: Observable<Cibo[]>

  constructor(private ciboService: CiboService) { }

  ngOnInit() {
    this.cibi$ = this.ciboService.list();
  }

}
