import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {filter} from 'rxjs/operators'
import {Categoria} from "../../model/categoria.model";
import {CategoriaService} from "../../services/categoria.service";
import {Router} from "@angular/router";
import {Cibo} from "../../model/cibo.model";
import {CiboService} from "../../services/cibo.service";

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {
  modalita: any;

  private filtriForm: FormGroup;
  private categorie$: Observable<Categoria[]>;
  private difficolta: number[];
  private tprep: string[];
  private filtri;

  private ingrForm: FormGroup;
  private ingredienti: FormArray;
  private cibi$: Observable<Cibo[]>

  constructor(private fb: FormBuilder,
              private catService: CategoriaService,
              public router: Router,
              private ciboService: CiboService) { }

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

    this.cibi$ = this.ciboService.list();
    this.ingrForm = this.fb.group({
      ingredienti: this.fb.array([])
    });
    this.populate();
  }

  populate(): void {
    this.ingredienti = this.ingrForm.get('ingredienti') as FormArray;
    this.cibi$.subscribe((cibi) => {
      const c: Cibo[] = cibi;
      for (let cibo of c) {
        this.ingredienti.push(this.createItem(cibo));
      }
    });
  }
  createItem(cibo): FormGroup {
    return this.fb.group({
      nome: `${cibo.nome}`,
      id: cibo.id
    });
  }

  /*getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.cibi$ = this.cibi$.pipe(filter((item) => {
        return (item.map((e) => { e.nome; }).indexOf(val));
      }));
    }
  }*/


  onSubmitAv(): void {
    // devo recuperare tutti i dati dalla form
    this.filtri.difficolta = this.filtriForm.value.difficolta;
    this.filtri.tprep = this.filtriForm.value.tprep;
    this.filtri.categoria = this.filtriForm.value.categoria;
    // updateProfilo torna un Observable con l'array di Ricetta
    this.router.navigate(['/risultatiricerca'], {
      queryParams: this.filtri,
    });
  }

  onSubmitIngr(): void {
    // devo recuperare tutti i dati dalla form
    let v = this.ingrForm.value.ingrediente;
    this.router.navigate(['/risultatiricerca'], {
      queryParams: v,
    });
  }
  segmentChanged(ev: any) {
    this.modalita = ev.detail.value;
  }

}
