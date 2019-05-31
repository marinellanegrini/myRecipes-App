import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

  preferiti: string[] = [
      'Carbonara',
      'Amatriciana'
  ];
  constructor() { }

  ngOnInit() {
  }

}
