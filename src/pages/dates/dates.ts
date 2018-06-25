import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

@IonicPage()
@Component({
  selector: 'page-dates',
  templateUrl: 'dates.html',
})
export class DatesPage {
	myrequests;
  constructor(public navCtrl: NavController,public events: Events,public reqservice: RequestsProvider, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.getmyrequests();
	this.events.subscribe('gotrequests', () => {
			this.myrequests = [];
			this.myrequests = this.reqservice.userdetails;
			
		})
  }
	
	getmyrequests(){
		this.reqservice.getmyrequests();
		
	}
	ionViewDidLeave(){
		this.events.unsubscribe('gotrequests');
	}
}
