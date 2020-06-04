import { Component, NgZone } from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';
import { BlueApiServiceProvider } from '../../providers/blue-api-service/blue-api-service';
import { UtilsProvider } from '../../providers/utils/utils'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;
  loginError = false;

  constructor(public zone: NgZone, public navCtrl: NavController, public restService: BlueApiServiceProvider, private app: App, private utils: UtilsProvider) {

  }

  login() {
    this.utils.presentLoading()
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
        this.registerUserwithMFP();
      });
    }, (error) => {
      this.zone.run(() => {
        this.utils.dismissLoading()
        console.log("Login Error: " + JSON.stringify(error));
        this.password = "";
        this.loginError = true;
      });
    });
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload)['user_name'];
  };

  navigateToCatalog() {
    this.password = "";
    this.loginError = false;
    this.utils.dismissLoading()
    const tabsNav = this.app.getNavByIdOrName('mainTab') as Tabs;
    tabsNav.select(1);
  }


  registerUserwithMFP() {
    var userID = this.parseJwt(this.restService.userState.accessToken)
    WLAuthorizationManager.login('UserLogin', {
      username: userID,
      password: userID
    }).then(() => {
      this.initializePush()
    }, error => {
      this.navigateToCatalog()
      console.log("UserLogin Failed : " + JSON.stringify(error))
    })
  }

  initializePush() {
    MFPPush.initialize(
      (successResponse) => {
        MFPPush.registerNotificationsCallback(this.notificationReceived);
        WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
          (accessToken) => {
            this.utils.dismissLoading()
            MFPPush.registerDevice(null, this.successCallback, this.failureCallback);
          }
        );
      },
      (failureResponse) => {
        this.navigateToCatalog()
        console.log("Failed to initialize");
      }
    );
  }

  notificationReceived = (message) => {
    if (message.alert.body !== undefined) {
      alert(message.alert.body);
    } else {
      alert(message.alert);
    }
  };

  successCallback = (response) => {
    this.navigateToCatalog()
    console.log("Success: " + JSON.stringify(response));
  };

  failureCallback = (response) => {
    this.navigateToCatalog()
    console.log("Error: " + JSON.stringify(response));
  };
}


