import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { ViewprofilePage } from '../../pages/viewprofile/viewprofile';
import { ChattingPage } from '../../pages/chatting/chatting';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
  
})
export class AboutPage {

  myrequests;
  myrequests2;
  mydates;
  constructor(public navCtrl: NavController,public chatserv : ChatProvider,public userservice: UserProvider,public zone: NgZone,public alrt: AlertController,public events: Events,public reqservice: RequestsProvider, public navParams: NavParams) {
 //this.userservice.usermenu();

		
	
 }

  ionViewWillEnter() {
	  this.userservice.usermenu();
    this.reqservice.getmyrequests();
	this.reqservice.getmyrequesters();
	this.reqservice.getmydates();
	this.userservice.usermenu();
	this.events.subscribe('gotrequests', () => {
			this.myrequests = [];
			this.myrequests = this.reqservice.userdetails;
			this.checkifpending();
			
	})
	this.events.subscribe('dates', () => {
			this.mydates = [];
			this.mydates = this.reqservice.mydates;
						console.log('got dates');
						this.checkifpending();

			
		})
		
		this.events.subscribe('gotrequesters', () => {
			this.myrequests2 = [];
			this.myrequests2 = this.reqservice.userdetails2;
								console.log('got reqestsers');
								this.checkifpending();

	})
	
  }
  
  checkifpending(){
	  //var temp ;
	  if(this.myrequests2){
	  for(var key in this.myrequests2){
		  for(var key2 in this.mydates){
			 
			  if(this.myrequests2[key].uid == this.mydates[key2].uid){
				  
				  this.myrequests2.splice(key,1);
			  }
		  }
	  }
	  }
  }
	
	getmyrequests(){
		this.reqservice.getmyrequests();
		
	}
	ionViewDidLeave(){
		this.events.unsubscribe('gotrequests');
		this.events.unsubscribe('gotrequesters');
		this.events.unsubscribe('dates');
	}
	
	accept(item){
		this.reqservice.acceptrequest(item).then(()=> {
			let alerter = this.alrt.create({
				title: 'Date added',
				subTitle: 'Tap your date to view thier profile',
				buttons: ['OK']
			});
		
			alerter.present();
			this.zone.run(()=>{
		  this.myrequests = [];
			this.myrequests = this.reqservice.userdetails;
					this.reqservice.getmyrequests();

		  this.mydates = [];
			this.mydates = this.reqservice.mydates;
			
	  })
			//this.navCtrl.setRoot(this.navCtrl.getActive().component);
		})
	}
	
	ignore(item){
			let alerter = this.alrt.create({
				title: 'Date declined',
				subTitle: 'Not your cup of tea?',
				buttons: ['OK']
			});
		
			
		this.reqservice.deleterequest(item).then(() => {
			alerter.present();
			this.zone.run(()=>{
		  this.myrequests = [];
			this.myrequests = this.reqservice.userdetails;
			this.navCtrl.setRoot(AboutPage);
		  //this.mydates = [];
			//this.mydates = this.reqservice.mydates;
			
	  })
		}).catch((err)=> {
			alert(err);
		})
	}
	
	viewprofile(person){
		this.navCtrl.push(ViewprofilePage, {userid: person.uid})
	}
	
	chat(person){
		
		this.chatserv.initializedate(person);
		this.navCtrl.push(ChattingPage)
	}

}
