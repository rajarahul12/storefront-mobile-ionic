import { Component, Renderer } from '@angular/core';
import {
  NavController,
  NavParams,
  Platform,
  Alert
} from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';

@Component({
  selector: 'page-Catalogdetails',
  templateUrl: 'Catalogdetails.html'
})
export class CatalogdetailsPage {
  itemQuantity = 0;
  card = {};
  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public navParams: NavParams,
    public platform: Platform,
    private restService: BlueApiServiceProvider
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

  buyItem() {
    if(this.itemQuantity > 0) {
      var payload = {
        itemId: this.card["id"],
        count: this.itemQuantity
      }
      this.restService.buyItems(payload, (response) => {
          console.log("Buy Item Resultt" + JSON.stringify(response))
          alert("Ordered placed successfully")
      }, (error) => {
        console.log("Buy Item Error: " + JSON.stringify(error));
        alert("Failed to place an order. Error : " + JSON.stringify(error))
    });
    } else {
      alert("Please select one or more quantity in order to place an order")
    }
  }

  handleButtonClick() {
    console.log('clicked');
  }

  setQuantity(count) {
    this.itemQuantity = count;
  }
}
