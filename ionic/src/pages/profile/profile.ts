import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  ordersData = [];

  constructor(public zone: NgZone, public navCtrl: NavController, public navParams: NavParams, private restService: BlueApiServiceProvider) {
  }

  ngOnInit() {
    console.log('ionViewDidLoad ProfilePage');
    this.restService.getCustomerProfile((data) => {
      alert(JSON.stringify(data))
    }, (error) => {
      console.log("getCustomerProfile Error" + JSON.stringify(error))
    })
    this.restService.getCatalog((data) => {
      var catalogMap = {};
      var catalog = data.responseJSON;
      for (let i = 0; i < catalog.length; i++) {
        var cat = catalog[i];
        catalogMap[cat.id] = cat.name;
      }
      this.restService.getCustomerOrders((response) => {
        this.zone.run(() => {
          console.log("Get Orders Result" + response.responseJSON)
          var ordersInfo = response.responseJSON;
          for (let i = 0; i < ordersInfo.length; i++) {
            let o = ordersInfo[i];
            this.ordersData.push({ date: o.date, itemId: o.itemId, itemName: catalogMap[o.itemId], count: o.count });
          }
        })
      }, (error) => {
        console.log("error" + JSON.stringify(error))
      })
    }, (error) => {
      alert("Failure : " + JSON.stringify(error))
    })
  }
}
