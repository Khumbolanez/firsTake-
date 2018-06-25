import { Component,ViewChild } from '@angular/core';
import { Nav,Platform,Events,ToastController,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilepicPage } from '../pages/profilepic/profilepic';
import { ProfilerPage } from '../pages/profiler/profiler';
import { SearchPage } from '../pages/search/search';
import { EventsPage } from '../pages/events/events';
import { ProfilebuilderPage } from '../pages/profilebuilder/profilebuilder';
import { VieweventPage} from '../pages/viewevent/viewevent';
import { UserProvider } from '../providers/user/user';
import { AdminPage } from '../pages/admin/admin';
import { SettingsPage } from '../pages/settings/settings';


import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
		@ViewChild(Nav) nav: Nav;
	username;
	userphoto;
	
 rootPage:any ;
 // rootPage:any ;
	pages: Array<{title: string, component: any}>;
  constructor(platform: Platform, public ldCtrl: LoadingController,public tst: ToastController,public afireauth: AngularFireAuth,public user: UserProvider, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events) {
       this.afireauth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = TabsPage;
    });
   platform.ready().then(() => {
    
      statusBar.styleDefault();
      //splashScreen.hide();
    });
	this.pages = [
	  { title: 'Home', component: TabsPage },
	  { title: 'Settings', component: SettingsPage }
    ];
	this.events.subscribe('userdetails', () => {
			this.username = this.user.username;
			this.userphoto = this.user.photoURL;
			
	})
  }
  
  openPage(page) {
    this.nav.push(page.component);
  }
  
  openadmin(){
	  this.nav.push(AdminPage);//
  }
  
  logout(){
	  var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  let loader = this.ldCtrl.create({
		 content : 'Logging out...' 
	  });
	  loader.present();
	  firebase.auth().signOut().then(() => {
		 toaster.setMessage('Logged out successfuly!');
		  toaster.present();
		  loader.dismiss();
		  this.nav.setRoot(LoginPage);
	  })
  }
}
