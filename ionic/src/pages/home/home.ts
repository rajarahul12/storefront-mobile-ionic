import { Component } from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private app: App) {
  }

  navigateToCatalog() {
    const tabsNav = this.app.getNavByIdOrName('mainTab') as Tabs;
    tabsNav.select(1);
  }
}
