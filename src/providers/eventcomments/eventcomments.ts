import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { IonicPage, NavController, NavParams, AlertController ,Events} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Injectable } from '@angular/core';


@Injectable()
export class EventcommentsProvider {
	fireevents = firebase.database().ref('/events');
	commentdetails;
	user;
  constructor(public userservice: UserProvider, public events: Events) {
    console.log('Hello EventcommentsProvider Provider');
	this.userservice.getuserdetail().then((res) => {
		  this.user = res;
	  })
  }
  
  ionViewWillEnter(){
	      console.log('Hello ionview event');

	  this.userservice.getuserdetail().then((res) => {
		  this.user = res;
	  });
  }
  
	sendcommenter(eventname,elmessage){
	
				var fireeventchats = firebase.database().ref('/events/' + eventname +'/comments' );

		var promise = new Promise((resolve,reject) => {
			
			fireeventchats.child(this.user.uid).push().set({
				displayName: this.user.displayName,
				photoURL: this.user.photoURL,
				message: elmessage,
				uid: this.user.uid
			}).then(() => {
				resolve({success: true});
			}).catch((err)=> {
				resolve(err);
			})
		})
		return promise;
	}
	getmycomments(eventname){
		let allmycomments;
		var mycomments = [];
		
		var fireeventchats = firebase.database().ref('/events/' + eventname +'/comments' );

		fireeventchats.orderByChild('uid').once('value', (snapshot) => {
			allmycomments = snapshot.val();
			mycomments = [];
			for(var i in allmycomments){
				mycomments.push(allmycomments[i]);
			}
			
				//this.numOfRequests = mycomments.length;
			
			this.userservice.getallusers().then((res: any) => {
				var allusers = res;
				this.commentdetails = [];
				for(var j in mycomments){
					for( var key  in mycomments){
							this.commentdetails.push(mycomments[key]);
					}
					
				}
				this.events.publish('gotcomments');
			})
		})
	}
}

