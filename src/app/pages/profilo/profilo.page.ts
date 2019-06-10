import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

    commenti: string[] =
      [
          'testo commento 1',
          'testo commento 2',
          'testo commento 3',
          'testo commento 4'
      ];

    descrizioni: string[] =
        [
            'data',
            'ora'
        ];

  constructor() { }

  ngOnInit() {
  }

}
