import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {Cibo} from '../../model/cibo.model';
import {CiboService} from '../../services/cibo.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ricercaingredienti',
  templateUrl: './ricercaingredienti.page.html',
  styleUrls: ['./ricercaingredienti.page.scss'],
})
export class RicercaingredientiPage implements OnInit {
  private ingrForm: FormGroup;
  private cibi$: Observable<Cibo[]>

  constructor(private ciboService: CiboService,
              private fb: FormBuilder,
              public router: Router) { }

  ngOnInit() {
    this.cibi$ = this.ciboService.list();
    this.ingrForm = this.fb.group({
      ingrediente: ['']
    });
  }

  onSubmit(): void {
    // devo recuperare tutti i dati dalla form
    let v = this.ingrForm.value.ingrediente;
    this.router.navigate(['/risultatiricerca'], {
      queryParams: v,
    });

    /*this.filtri.difficolta = this.filtriForm.value.difficolta;
    this.filtri.tprep = this.filtriForm.value.tprep;
    this.filtri.categoria = this.filtriForm.value.categoria;*/
    // updateProfilo torna un Observable con l'array di Ricetta
    /*this.router.navigate(['/risultatiricerca'], {
      queryParams: this.filtri,
    });*/
  }

}
