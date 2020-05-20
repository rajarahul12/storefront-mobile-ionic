import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';
import { CatalogdetailsPage } from '../Catalogdetails/Catalogdetails';

@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html'
})
export class CatalogPage {
  cards = [
    {
      imageUrl: 'assets/imgs/image-list-1.jpg',
      title: 'Nine Inch Nails Live',
      description: 'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.'
    },
    {
      imageUrl: 'assets/imgs/image-list-1.jpg',
      title: 'Erykah Badu',
      description: 'American singer-songwriter, record producer, activist, and actress, Badu\'s style is a prime example of neo-soul.'
    },
    {
      imageUrl: 'assets/imgs/image-list-1.jpg',
      title: 'Queen',
      description: 'The British rock band formed in London in 1970, and is considered one of the biggest stadium rock bands in the world.'
    },
    {
      imageUrl: 'assets/imgs/image-list-1.jpg',
      title: 'Björk',
      description: 'Björk is an Icelandic singer, songwriter and actress.'
    },
    {
      imageUrl: 'assets/imgs/image-list-1.jpg',
      title: 'Run-D.M.C.',
      description: 'The American hip hop group widely acknowledged as one of the most influential acts in the history of hip hop.'
    },];

  constructor(public navCtrl: NavController) { }

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
