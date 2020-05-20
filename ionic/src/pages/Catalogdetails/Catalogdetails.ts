import { Component, Renderer } from '@angular/core';
import {
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';

@Component({
  selector: 'page-Catalogdetails',
  templateUrl: 'Catalogdetails.html'
})
export class CatalogdetailsPage {
  card = {};
  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public navParams: NavParams,
    public platform: Platform
  ) {
    this.card = navParams.data.cardDetails;
  }
  viewPlatform: string = '';
  ionViewWillEnter() {
    if (this.platform.is('core')) {
      this.viewPlatform = 'web';
    } else {
      this.viewPlatform = 'mobile';
    }
  }

  handleButtonClick() {
    console.log('clicked');
  }
}
