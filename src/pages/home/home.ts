import { Component,NgZone } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { EventsPage } from '../../pages/events/events';
import { VieweventPage } from '../../pages/viewevent/viewevent';
import { ProfilerPage } from '../../pages/profiler/profiler';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})
export class HomePage {
	numreq;
  myrequests;
  attendees = [];
  tempar = [];
  user;
  eventdate;
  nowdate;
  nowdate2;
  yearsleft: number;
  monthsleft: number;
  daysleft: number;
	filteredevents = [];
  constructor(public navCtrl: NavController,public chatserv: ChatProvider,public afireauth: AngularFireAuth,public userservice: UserProvider,public zone: NgZone,public events: Events,public reqservice: RequestsProvider) {
	
	this.userservice.getallevents().then((res: any) => {
		console.log("err las");
		this.filteredevents = res;
		this.tempar = res;
		for(var key in this.filteredevents){
			this.eventdate = this.filteredevents[key].eventdate ;
			this.nowdate = new Date().toISOString().slice(0,10); 
			let year1 = this.eventdate.charAt(0) + this.eventdate.charAt(1) +
			this.eventdate.charAt(2) + this.eventdate.charAt(3);
			let month1 = this.eventdate.charAt(5) + this.eventdate.charAt(6);
			let day1 = this.eventdate.charAt(8) + this.eventdate.charAt(9);
			let year2 = this.nowdate.charAt(0) + this.nowdate.charAt(1) +
			this.nowdate.charAt(2) + this.nowdate.charAt(3);
			let month2 = this.nowdate.charAt(5) + this.nowdate.charAt(6);
			let day2 = this.nowdate.charAt(8) + this.nowdate.charAt(9);
			this.filteredevents[key].yearsleft = Number(year1) - Number(year2); 
			this.filteredevents[key].monthsleft = Number(month1) - Number(month2);
			if(Number(day1) > Number(day2))	{		
			this.filteredevents[key].daysleft = Number(day1) - Number(day2);
			}
			else{
				this.filteredevents[key].monthsleft = this.filteredevents[key].monthsleft - 1;
				if(Number(month1) == 1){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}
				else if(Number(month1) == 2){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 3){
					this.filteredevents[key].daysleft = 28 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 4){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 5){
					this.filteredevents[key].daysleft = 30 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 6){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 7){
					this.filteredevents[key].daysleft = 30 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 8){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 9){
					this.filteredevents[key].daysleft = 30 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 10){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 11){
					this.filteredevents[key].daysleft = 30 + (Number(day1) - Number(day2));
				}else if(Number(month1) == 12){
					this.filteredevents[key].daysleft = 31 + (Number(day1) - Number(day2));
				}
			}
			this.filteredevents[key].monthsleft =this.filteredevents[key].monthsleft + (this.filteredevents[key].yearsleft * 12);	
		}
	})
	
  }
  
   ionViewWillEnter() {
    console.log('ionViewDidLoad Home');
	this.user = this.afireauth.auth.currentUser.uid;
	this.userservice.usermenu();
	this.reqservice.getmyrequests();
	
	
  }
  
  openprofile(){
	 // this.navCtrl.push(ProfilerPage);
  }
  
  joinevent(eventnamer){
	  this.userservice.addusertoevent(eventnamer).then((res: any) => {
		  alert("you have joined");
	  })
  }
  
  viewevent(key){
	  this.chatserv.initializevent(key.eventname);
	  this.navCtrl.push(VieweventPage, {nameofevent: key.eventname,dateofevent: key.eventdate});
  }
 
  
	getmyrequests(){
		this.reqservice.getmyrequests();
		
	}
	ionViewDidLeave(){
		//this.events.unsubscribe('gotrequests');
	}

}
