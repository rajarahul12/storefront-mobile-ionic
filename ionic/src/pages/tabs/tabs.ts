import { Component } from '@angular/core';

import { CatalogPage } from '../catalog/catalog';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CatalogPage;
  tab3Root = LoginPage;

  constructor() {

  }
}
