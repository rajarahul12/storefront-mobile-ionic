import { Component } from '@angular/core';

import { CatalogPage } from '../catalog/catalog';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { LogoutPage } from '../logout/logout';
import { ProfilePage } from '../profile/profile';
import { App, Tabs, NavController } from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CatalogPage;
  tab3Root = LoginPage;
  tab4Root = ProfilePage;
  tab5Root = LogoutPage;

  constructor(private navCtrl: NavController, public restService : BlueApiServiceProvider, private app: App) {
  }

  
 }
