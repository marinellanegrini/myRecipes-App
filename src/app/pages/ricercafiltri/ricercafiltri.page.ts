import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Categoria} from '../../model/categoria.model';
import {Observable} from 'rxjs';
import {CategoriaService} from '../../services/categoria.service';
import {RicettaService} from '../../services/ricetta.service';
import {Ricetta} from '../../model/ricetta.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-ricercafiltri',
  templateUrl: './ricercafiltri.page.html',
  styleUrls: ['./ricercafiltri.page.scss'],
})
export class RicercafiltriPage implements OnInit {
  private filtriForm: FormGroup;
  private categorie$: Observable<Categoria[]>;
  private difficolta: number[];
  private tprep: string[];
  private filtri;

  constructor(private fb: FormBuilder,
              private catService: CategoriaService,
              public router: Router) { }

  ngOnInit() {
    this.categorie$ = this.catService.list();
    this.difficolta = [1, 2, 3, 4, 5];
    this.tprep = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60+'];
    this.filtri = {
      difficolta: '',
      tprep: '',
      categoria: ''
    }
    this.filtriForm = this.fb.group({
      difficolta: [''],
      tprep: [''],
      categoria: ['']
    });


  }

  onSubmit(): void {
    // devo recuperare tutti i dati dalla form
    this.filtri.difficolta = this.filtriForm.value.difficolta;
    this.filtri.tprep = this.filtriForm.value.tprep;
    this.filtri.categoria = this.filtriForm.value.categoria;
    // updateProfilo torna un Observable con l'array di Ricetta
    this.router.navigate(['/risultatiricerca'], {
      queryParams: this.filtri,
    });
  }


}
