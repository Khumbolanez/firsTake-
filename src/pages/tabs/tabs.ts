import { Component } from '@angular/core';
import { Platform,Events,ToastController,LoadingController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ProfilerPage } from '../profiler/profiler';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { NgZone } from '@angular/core';
import { RequestsProvider } from '../../providers/requests/requests';
import { OthereventsPage } from '../otherevents/otherevents';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
	tab1BadgeCount: number = 0;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ProfilerPage;
  tab4Root = OthereventsPage;
  

  constructor(public zone: NgZone,public splashScreen: SplashScreen,public reqservice: RequestsProvider,public events: Events) {
	this.tab1BadgeCount = 0;
	this.splashScreen.hide();
	this.events.subscribe('gotrequests', () => {
			this.tab1BadgeCount = this.reqservice.numOfRequests;
		//	
	})
  }
  
   ionViewWillLoad() {
    console.log('ionViewDidLoad LoginPage');
	this.splashScreen.hide();
  }
  
   
}
