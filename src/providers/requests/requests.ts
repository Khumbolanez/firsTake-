import { Injectable, NgZone } from '@angular/core';
import { Events}  from 'ionic-angular';
import { connreg} from '../../models/interfaces/request';
import { UserProvider } from '../../providers/user/user';

import firebase from 'firebase';

@Injectable()
export class RequestsProvider {
	firereq = firebase.database().ref('/requests');
	firereq2 = firebase.database().ref('/requesters');
	firedates = firebase.database().ref('/dates');
	firebios = firebase.database().ref('/bios');
	//usercollection = firebase.database().ref('/users');
	userdetails;
	userdetails2;
	mydates;
	numOfRequests;

  constructor(public userservice: UserProvider,public zone: NgZone, public events:Events) {
    console.log('Hello RequestsProvider Provider');
  }
  
  hello(){
	  console.log('for the tabs');
  }
  
  
	sendrequest(req: connreg){
		var promise = new Promise((resolve,reject) => {
			this.firereq.child(req.recipient).push().set({
				sender: req.sender,
				decision: ''
			}).then(() => {
				resolve({success: true});
			}).catch((err)=> {
				resolve(err);
			})
		})
		return promise;
	}
	
	saverequest(req: connreg){
		var promise = new Promise((resolve,reject) => {
			this.firereq2.child(req.sender).push().set({
				sender: req.recipient,
				decision: ''
			}).then(() => {
				resolve({success: true});
			}).catch((err)=> {
				resolve(err);
			})
		})
		return promise;
	}
	
	getmyrequests(){
		let allmyrequests;
		var myrequests = [];
		console.log("user uid: " + firebase.auth().currentUser.uid);
		this.firereq.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
			allmyrequests = snapshot.val();
			myrequests = [];
			for(var i in allmyrequests){
				myrequests.push(allmyrequests[i].sender);
			}
			
				this.numOfRequests = myrequests.length;
			
			this.userservice.getallusers().then((res: any) => {
				var allusers = res;
				this.userdetails = [];
				for(var j in myrequests){
					for( var key  in allusers){
						if(myrequests[j] === allusers[key].uid){
							this.userdetails.push(allusers[key]);
						}
					}
				}
				this.events.publish('gotrequests')
			})
		})
	}
	
	getmyrequesters(){
		let allmyrequests;
		var myrequests = [];
		console.log("user uid: " + firebase.auth().currentUser.uid);
		this.firereq2.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
			allmyrequests = snapshot.val();
			myrequests = [];
			for(var i in allmyrequests){
				myrequests.push(allmyrequests[i].sender);
			}
			
				this.numOfRequests = myrequests.length;
			
			this.userservice.getallusers().then((res: any) => {
				var allusers = res;
				this.userdetails2 = [];
				for(var j in myrequests){
					for( var key  in allusers){
						if(myrequests[j] === allusers[key].uid){
							this.userdetails2.push(allusers[key]);
						}
					}
				}
				this.events.publish('gotrequesters')
			})
		})
	}
	
	
	
	acceptrequest(date){
		var promise = new Promise((resolve,reject)=>{
			this.firedates.child(firebase.auth().currentUser.uid).push().set({
				uid: date.uid
			}).then(() => {
				this.firedates.child(date.uid).push().set({
					uid: firebase.auth().currentUser.uid
				}).then(() => {
					this.deleterequest(date).then(() => {
						resolve(true);
					}).catch((err) => {
						reject(err);
					})
				}).catch((err) =>{
					reject(err);
				})
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	deleterequest(date){
		var promise = new Promise((resolve, reject) => {
			
			this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(date.uid).once('value' , (snapshot) => {
				let somekey;
				for(var key in snapshot.val()){
					somekey = key;
				}
				this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
					
					resolve(true);
				})
			 
				 
			}).catch((err) => {
				reject(err);
			})
		})
		
		return promise;
	}
	
	getmydates(){
		var datesuid = [];
		this.firedates.child(firebase.auth().currentUser.uid).on('value',(snapshot) => {
			let alldates = snapshot.val();
			datesuid = [];
				for(var i in alldates){
					datesuid.push(alldates[i].uid);
				}
		
			this.userservice.getallusers().then((users) => {
				this.mydates = [];
				for(var j in datesuid){
					for(var key in users){
						if(datesuid[j] === users[key].uid ){
							this.mydates.push(users[key]);
						}
					}
				}
				this.events.publish('dates');
			}).catch((err) => {
			alert(err);
			})
		})
	}
}
