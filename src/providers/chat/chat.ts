import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ChatProvider {
	firedatechats = firebase.database().ref('/datechats');
	date: any;
	elevent;
	datemessages = [];
	eventcomments = [];
  constructor(public events: Events,public afireauth: AngularFireAuth) {
    console.log('Hello ChatProvider Provider');
  }
  
  initializedate(date){
	  this.date = date;
  }
  
  initializevent(eventname){
	  this.elevent = eventname;
  }
  
  sendnewmessage(msg){
	  let timesent: any = new Date().toISOString().slice(0,23);
	
	var time = '';
	
	 time = time +  timesent.charAt(12); 
	 time = time +  timesent.charAt(13); 
	 time = time +  timesent.charAt(14); 
	 time = time +  timesent.charAt(15); 
	 if(timesent.charAt(11) == 1){
		time = time + ' pm';
	}
	else{
		time = time + ' am';

	}
	  if(this.date){
		  var promise = new Promise((resolve,reject) => {
			this.firedatechats.child(firebase.auth().currentUser.uid).child(this.date.uid).push().set({
				sentby: firebase.auth().currentUser.uid,
				message: msg,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				timesent: time,
				read: false
			}).then(() => {
				this.firedatechats.child(this.date.uid).child(firebase.auth().currentUser.uid).push({
					sentby: firebase.auth().currentUser.uid,
					message: msg,
					timestamp: firebase.database.ServerValue.TIMESTAMP,
					timesent: time,
					read: false
				}).then(() => {
					resolve(true);
				})
			})
		})
		return promise;
	  }
  }
  
  eventcomment(msg,eventname){
	  let timesent: any = new Date().toISOString().slice(0,23);
	 let sentBy = firebase.auth().currentUser.displayName;
			let	photo =  firebase.auth().currentUser.photoURL;
	
	var time = '';
	
	 time = time +  timesent.charAt(12); 
	 time = time +  timesent.charAt(13); 
	 time = time +  timesent.charAt(14); 
	 time = time +  timesent.charAt(15); 
	 if(timesent.charAt(11) == 1){
		time = time + ' pm';
	}
	else{
		time = time + ' am';

	}
	  
		  var promise = new Promise((resolve,reject) => {
			  var fireeventcomments = firebase.database().ref('/events/' + eventname + '/comments');
			fireeventcomments.push().set({
				sentby: sentBy,
				photoURL: photo,
				message: msg,
			
				timesent: time
			}).then(() => {
				
					resolve(true);
				
			})
		})
		return promise;
	  
  }
  
 
  
  
  geteventcomments(){
	  
	  let temp ;
	   var fireeventcomments = firebase.database().ref('/events/' + this.elevent);

	fireeventcomments.child('comments').on('value', (snapshot) => {
				this.eventcomments = [];
				temp = snapshot.val();
				for(var tempkey in temp){
					this.eventcomments.push(temp[tempkey]);
				}
				this.events.publish('newcomment');
			})
  }
  
  getdatemessages(){
	  
	  let temp ;
	this.firedatechats.child(firebase.auth().currentUser.uid).child(this.date.uid).on('value', (snapshot) => {
				this.datemessages = [];
				temp = snapshot.val();
				for(var tempkey in temp){
					this.datemessages.push(temp[tempkey]);
				}
				this.events.publish('newmessage');
			})
  }
  
  readmessage(message){
	  	console.log('message sentby: ' +  message.sentby);
	  	console.log('message msg: ' +  message.message);
	  	console.log('message read: ' +  message.read);
	  	

		var promise = new Promise((resolve, reject) => {

			this.firedatechats.child(firebase.auth().currentUser.uid).child(this.date.uid).orderByChild('timestamp').equalTo(message.timestamp).once('value' , (snapshot) => {
				let somekey;
				for(var key in snapshot.val()){
					somekey = key;
					console.log('reading 1st key: ' + somekey);
				}

				this.firedatechats.child(firebase.auth().currentUser.uid).child(this.date.uid).child(somekey).update({
					sentby: message.sentby,
					message: message.message,
					timestamp: message.timestamp,
					timesent: message.timesent,
					read: true
				}).then(() => {
				this.firedatechats.child(this.date.uid).child(firebase.auth().currentUser.uid).orderByChild('timestamp').equalTo(message.timestamp).once('value' , (snapshot) => {
					let somekey;
					for(var key in snapshot.val()){
						somekey = key;
						console.log('reading key: ' + somekey);

					}
					this.firedatechats.child(this.date.uid).child(firebase.auth().currentUser.uid).child(somekey).update({
						sentby: message.sentby,
						message: message.message,
						timestamp: message.timestamp,
						timesent: message.timesent,
						read: true
						
					}).then(() => { 
						resolve(true);
					})
					
					})
			 
				 
			}).catch((err) => {
				reject(err);
			})
	  	  })
		})
		return promise;
	}
  
 
  }


