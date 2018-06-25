import { Component, NgZone,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events, Content,PopoverController ,LoadingController,ToastController} from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-chatting',
  templateUrl: 'chatting.html',
})
export class ChattingPage {
	@ViewChild('content') content: Content;
	date: any;
	photoURL;
	empty;
	
	datephotoURL;
	allmessages = [];
	newmessage ;
	
  constructor(public navCtrl: NavController,public alrt: AlertController,public userservice: AuthProvider,public tst: ToastController,public ldCtrl: LoadingController,public zone: NgZone,public popoverCtrl: PopoverController,public events: Events, public chatserv: ChatProvider,public navParams: NavParams) {
	
	this.date = this.chatserv.date;
	  this.datephotoURL = this.date.photoURL;
	  this.chatserv.getdatemessages();
	 
	  this.events.subscribe('newmessage', () => {
		  this.zone.run(() => {
		this.allmessages = [];
		this.allmessages = this.chatserv.datemessages;
		this.scrollto();

		  })
		 
		  
	})
	
	this.photoURL = firebase.auth().currentUser.photoURL;
	
  }

  ionViewDidEnter() {
	  this.date = this.chatserv.date;
	  this.datephotoURL = this.date.photoURL;
	  this.chatserv.getdatemessages();
	 
	  this.events.subscribe('newmessage', () => {
		  this.zone.run(() => {
		this.allmessages = [];
		this.allmessages = this.chatserv.datemessages;
		
		this.scrollto();
		
		  })
		  
		 
		//  
	})
	
  }
  
  scrollto(){
	  setTimeout(() => {
		  this.content.scrollToBottom();
	  }, 1000)
  }
  
  readto(){
	  setTimeout(() => {
		  this.readmsgs();
	  }, 2000)
  }
  
  sendmessage(){
	  
		   this.chatserv.sendnewmessage(this.newmessage).then((res: any) => {
		  		  this.zone.run(() => {

					  this.newmessage = '';
					  this.scrollto();
					  		

				  })
	  })
	  
	 
	  
  }
  
  readmsgs(){
	 
	  
		  if(this.allmessages[0].sentby == this.date.uid){
				
				
			  this.chatserv.readmessage(this.allmessages[0]).then((res: any) =>{
				  console.log('successful read');
			  })
			   
		  }
	  
	  
  }

}
