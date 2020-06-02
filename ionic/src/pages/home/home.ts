import { Component, Renderer } from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public renderer: Renderer, public navCtrl: NavController, private app: App) {
    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      WL.Analytics.enable();
      this.initializePush();
    });
  }
  
  initializePush() {
    MFPPush.initialize(
      function (successResponse) {
        MFPPush.registerNotificationsCallback(notificationReceived);
        WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
          function (accessToken) {
            MFPPush.registerDevice(null, successCallback, failureCallback);
          }
        );
      },
      function (failureResponse) {
        console.log("Failed to initialize");
      }
    );
  }
  navigateToCatalog() {
    const tabsNav = this.app.getNavByIdOrName('mainTab') as Tabs;
    tabsNav.select(1);
  }
}

let notificationReceived = function (message) {
  if (message.alert.body !== undefined) {
    alert(message.alert.body);
  } else {
    alert(message.alert);
  }
};

let successCallback = function (response) {
  console.log("Success: " + JSON.stringify(response));
};

let failureCallback = function (response) {
  console.log("Error: " + JSON.stringify(response));
};
