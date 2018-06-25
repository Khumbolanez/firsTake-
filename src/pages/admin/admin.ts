import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsPage } from '../../pages/events/events';
import { SearchPage } from '../../pages/search/search';
import { NewsfeedPage } from '../../pages/newsfeed/newsfeed';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
	
	openevent(){
		this.navCtrl.push(EventsPage);
		

	}
	
	openusers(){
		this.navCtrl.push(SearchPage);
	}
	
	addnewsfeed(){
	  this.navCtrl.push(NewsfeedPage);
  }
}
