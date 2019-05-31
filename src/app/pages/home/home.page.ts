import { Component, OnInit } from '@angular/core';
import {Ricetta} from "../../model/ricetta.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slides: string[] = [
      'ricetta 1',
      'ricetta 2'
  ];
  recipes: string[] = [
    'ricetta 1',
    'ricetta 2',
    'ricetta 3'
  ]

  constructor() { }

  ngOnInit() {
  }

}
