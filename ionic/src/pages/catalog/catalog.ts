import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';
import { CatalogdetailsPage } from '../catalogdetails/catalogdetails';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';

@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html'
})
export class CatalogPage {
  cards;

  constructor(public navCtrl: NavController, private restService: BlueApiServiceProvider, public zone: NgZone) { 
    
  }

  ionViewWillEnter() {
    this.restService.getCatalog((data) => {
      this.zone.run(() => {
        this.cards = data.responseJSON;
      })
    }, (error) => {
      alert("Failure : " + JSON.stringify(error))
    })
  }

  cardTapped(card) {
    this.navCtrl.push(
      CatalogdetailsPage,
      { cardDetails: card }
    );
  }

  share(card) {
    alert(card.title + ' was shared.');
  }

  listen(card) {
    alert('Listening to ' + card.title);
  }

  favorite(card) {
    alert(card.title + ' was favorited.');
  }
}
