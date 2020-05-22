import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DataStore } from './dataStore';
import { MyApp } from './app.component';

import { CatalogPage } from '../pages/catalog/catalog';
import { CatalogdetailsPage } from '../pages/Catalogdetails/Catalogdetails';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LiveUpdateProvider } from '../providers/live-update/live-update';
import { LogoutPage } from '../pages/logout/logout';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BlueApiServiceProvider } from '../providers/blue-api-service/blue-api-service';

@NgModule({
  declarations: [
    MyApp,
    CatalogPage,
    CatalogdetailsPage,
    LoginPage,
    HomePage,
    TabsPage,
    ProfilePage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CatalogPage,
    CatalogdetailsPage,
    LoginPage,
    HomePage,
    LogoutPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataStore,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BlueApiServiceProvider,
    LiveUpdateProvider
  ]
})
export class AppModule {}
