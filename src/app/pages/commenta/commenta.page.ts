import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { NavController} from '@ionic/angular';
import {Commento} from '../../model/commento.model';
import {UtenteService} from '../../services/utente.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-commenta',
  templateUrl: './commenta.page.html',
  styleUrls: ['./commenta.page.scss'],
})
export class CommentaPage implements OnInit {

  private comForm: FormGroup;
  private idricetta: number;

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private navCnt: NavController,
              private router: Router,
              private utenteService: UtenteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap.subscribe((params: ParamMap) => {
      this.idricetta = parseInt(params.get('id'), 0);
    });
      this.comForm = this.fb.group({
      testo: ['', Validators.required]
    });
  }
   Cancel() {
    this.navCnt.back();
   }
   Submit() {
     const commento = new Commento();
     commento.testo = this.comForm.value.testo;
     commento.data = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
     commento.ora = this.datePipe.transform(Date.now(), 'H:mm:ss');
     commento.idricetta = this.idricetta;
     this.utenteService.commenta(commento).subscribe( () => {
        this.router.navigate(['ricette/' + this.idricetta]);
     });
   }

}
