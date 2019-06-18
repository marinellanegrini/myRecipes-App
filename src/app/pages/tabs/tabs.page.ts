import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PreferitiPage} from "../preferiti/preferiti.page";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private navController: NavController,
              public router: Router) { }

  ngOnInit() {
  }
  impostazioni() {
    this.navController.navigateForward('settings');
  }

}
