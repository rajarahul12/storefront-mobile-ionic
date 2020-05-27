import { Component, NgZone } from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;
  loginError = false;

  constructor(public zone: NgZone, public navCtrl: NavController, public restService: BlueApiServiceProvider, private app: App) {

  }

  login() {
    var payload = {
      grant_type: 'password',
      scope: 'blue',
      username: this.username,
      password: this.password
    }
    this.restService.loginUser(payload, (response) => {
      this.zone.run(() => {
        console.log("Login Result" + JSON.stringify(response))
        this.restService.userState.accessToken = response.responseJSON.access_token
        this.restService.userState.authenticated = true;
        this.password = "";
        this.loginError = false;
        const tabsNav = this.app.getNavByIdOrName('mainTab') as Tabs;
        tabsNav.select(1);
      });
    }, (error) => {
      this.zone.run(() => {
        console.log("Login Error: " + JSON.stringify(error));
        this.password = "";
        this.loginError = true;
      });
    });
  }

}
