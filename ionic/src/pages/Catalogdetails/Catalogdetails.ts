import { Component, Renderer, NgZone } from '@angular/core';
import {
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';

@Component({
  selector: 'page-Catalogdetails',
  templateUrl: 'Catalogdetails.html'
})
export class CatalogdetailsPage {
  itemQuantity = 0;
  quantity:string
  card = {};
  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public navParams: NavParams,
    public platform: Platform,
    private restService: BlueApiServiceProvider,
    private zone:NgZone
  ) {
    this.card = navParams.data.cardDetails;
  }
  viewPlatform: string = '';
  ionViewWillLeave() {
    this.navCtrl.pop();
  }


  buyItem() {
    if(this.itemQuantity > 0) {
      var payload = {
        itemId: this.card["id"],
        count: this.itemQuantity
      }
      this.restService.buyItems(payload, (response) => {
          console.log("Buy Item Resultt" + JSON.stringify(response))
          this.zone.run(() => {
            alert("Ordered placed successfully")
            this.quantity = null;
          })
      }, (error) => {
        console.log("Buy Item Error: " + JSON.stringify(error));
        this.zone.run(() => {
          alert("Failed to place an order. Error : " + JSON.stringify(error))
          this.quantity = null;
        })
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
