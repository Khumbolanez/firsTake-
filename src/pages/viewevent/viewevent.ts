import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,Events} from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import { ViewprofilePage} from '../../pages/viewprofile/viewprofile';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import { EventcommentsProvider } from '../../providers/eventcomments/eventcomments';
import firebase from 'firebase';
import { connreg } from '../../models/interfaces/request';


@IonicPage()
@Component({
  selector: 'page-viewevent',
  templateUrl: 'viewevent.html'
})
export class VieweventPage {
	allusers = [];
	filteredusers = [];
	filteredfeeds = [];
	//allcomments = [];
	femaleusers = [];
	maleusers = [];
	otherusers = [];
	tempar = [];
	comment;
	comments: object[];
	sub;
	eventname;
	eventdate ;
		newrequest = {} as connreg;
		commentses: any = false;
		newsfeed: any = false;
		attendance: any = true;
	currentuser;	
	message;
	eventcomments = [];
	attendees: number;
  constructor(public navCtrl: NavController,public chatserv: ChatProvider,public eventservice: EventcommentsProvider,public requestsservice: RequestsProvider,public alrt: AlertController,public zone: NgZone,public userservice: UserProvider, public navParams: NavParams,public events: Events) {
	this.eventname = this.navParams.get('nameofevent');
	this.eventdate = this.navParams.get('dateofevent');
	this.currentuser = firebase.auth().currentUser.uid;
	
	
  }
  
  ionViewWillEnter() {
	  this.userservice.getallusersattending(this.navParams.get('nameofevent')).then((res: any) => {
		this.filteredusers = res;
		this.allusers = res;
		this.tempar = res;
		this.attendees = this.filteredusers.length;
		console.log("attemdance: " + this.attendees);
	})
	
	this.userservice.geteventfeed(this.navParams.get('nameofevent')).then((res: any) => {
		this.filteredfeeds = res;
		
	})
	
	  this.eventname = this.navParams.get('nameofevent');
	this.eventdate = this.navParams.get('dateofevent');
	this.chatserv.geteventcomments();
	console.log('does it even run');
	 this.events.subscribe('newcomment', () => {
		  this.zone.run(() => {
		this.eventcomments = [];
		this.eventcomments = this.chatserv.eventcomments;
		//this.scrollto();

		  }) 
		  
	})
	
	
	
  }
  
  ionViewDidLeave(){
		this.events.unsubscribe('gotcomments');
	}
	
  
  
  sendcomment(){
	  this.chatserv. eventcomment(this.comment,this.eventname).then((res: any) => {
		this.zone.run(() => {
			this.comment = '';
			//this.tempar = res;
			
		})
	  })
	  
  }
  getattendance(){
	  this.zone.run(() => {
		  this.commentses  = false;
			this.newsfeed  = false;
			this.attendance  = true;
			this.attendees = this.allusers.length;
	  })
  }
  
   getnewsfeed(){
	  this.zone.run(() => {
		  this.commentses  = false;
			this.newsfeed  = true;
			this.attendance  = false;
			this.attendees = this.allusers.length;
	  })
  }
   getcommentsflag(){
	  this.zone.run(() => {
		  this.commentses  = true;
			this.newsfeed  = false;
			this.attendance  = false;
			this.attendees = this.allusers.length;
	  })
  }
  
  getfemales(){
	this.userservice.getfemaleusers(this.eventname).then((res: any) => {
		this.zone.run(() => {
		this.filteredusers = res;
		this.tempar = res;
	})
	  })
  }
  getmales(){
	  
	this.userservice.getmaleusers(this.eventname).then((res: any) => {
		this.zone.run(() => {
			this.filteredusers = res;
			this.tempar = res;
		})
	  })
  }
  getothers(){
	this.userservice.getotherusers(this.eventname).then((res: any) => {
		this.zone.run(() => {
			this.filteredusers = res;
			this.tempar = res;
	
		})
	  })
  }
  getall(){
	this.userservice.getallusersattending(this.eventname).then((res: any) => {
		this.zone.run(() => {
			this.filteredusers = res;
			this.tempar = res;
		
		})
	})
  }
  

  
  
  searchuser(searchbar){
	  this.filteredusers = this.tempar;
	  var q = searchbar.target.value;
	  if(q.trim() == ''){
		  return;
	  }
	  
	  this.filteredusers= this.filteredusers.filter((v) => {
		  if((v.displayName.toLowerCase().indexOf(q.toLowerCase())) > -1){
			  return true;
		  }
		  return false;
	  })
  }
  
  sendreq(recipient){
	  this.newrequest.sender = firebase.auth().currentUser.uid;
	  this.newrequest.recipient = recipient.uid;
	  if(this.newrequest.sender == this.newrequest.recipient){
		  alert("Why would one want to be friends with self?");
	  }
	  else{
			  let successalert = this.alrt.create({
				  title: 'Request sent',
				  subTitle: 'You requested a date from ' + recipient.displayName,
				  buttons: ['Cool']
			  });
		  
		  this.requestsservice.sendrequest(this.newrequest).then((res: any) => {
			  if(res.success){
				  successalert.present();
				  let sentuser = this.filteredusers.indexOf(recipient);
				  this.filteredusers.splice(sentuser, 1);
			  }
		  }).catch((err) => {
			  alert(err);
		  })
	  }
	  
	  
  }
  
  removefromsearch(recipient){
	let sentuser = this.filteredusers.indexOf(recipient);
				  this.filteredusers.splice(sentuser, 1);
	}
	
	viewprofile(person){
		let arr = this.filteredusers;
		let temparr = [];
				for(var key in arr){
					temparr.push(arr[key].uid);
					console.log("temp[" +key +"]: " + arr[key].uid );
				}
		if(temparr.indexOf(this.currentuser) >= 0){
			this.navCtrl.push(ViewprofilePage, {userid: person.uid})
		}
		else{
			alert("you must join the event to view profiles");
			
		}
	}
	
	presentPrompt(recipient) {
	let alerter = this.alrt.create({
    title: 'Request date',
    
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send Request',
        handler: data => {
          this.sendreq(recipient);
		  alert("Your request has been sent to " + recipient.displayName  );
        }
      }
    ]
  });
  alerter.present();
}
	
	
}
