import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { App, Tabs, IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(private zone:NgZone, public navCtrl: NavController, public navParams: NavParams, public restService: BlueApiServiceProvider, private app: App, private cd: ChangeDetectorRef) {
    
  }

  ionViewWillEnter() {
    this.zone.run(() => {
      this.restService.userState.accessToken = null;
      this.restService.userState.authenticated = false;
      const tabsNav = this.app.getNavByIdOrName('mainTab') as Tabs;
      tabsNav.select(1);
      this.cd.detectChanges()
    });  
  }

}
