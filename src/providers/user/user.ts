import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { IonicPage, NavController, NavParams, AlertController ,Events} from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';


@Injectable()
export class UserProvider {
	firedata = firebase.database().ref('/users');
	firebios = firebase.database().ref('/bios');
	fireevents = firebase.database().ref('/events');
	firenotify = firebase.database().ref('/notifications');

	user: any;
	eluser: any;
	username;
	photoURL;
	signingup = true;
	userdetails;
  constructor(public afireauth: AngularFireAuth,public fcm: FcmProvider,public events: Events) {
    console.log('Hello UserProvider Provider');

	 
	  
  }
  
  usermenu(){
	  this.eluser= this.afireauth.auth.currentUser;
	  this.username = this.eluser.displayName;
	  this.photoURL = this.eluser.photoURL;
	  
	  this.events.publish('userdetails')
	  //
  }
  
  ionViewWillEnter(){
	 console.log('fire!!!!!!!!');
	  
  }
  
  addevente(evente){
	  var promise = new Promise ((resolve,reject) => {
	  this.fireevents.child(evente.eventname).set({
			eventname: evente.eventname,
			eventdate: evente.eventdate,
			eventavatar: evente.avatar,
			eventdesc: evente.eventdescription,
			yearsleft: '',
			monthsleft: '',
			daysleft: ''
		}).then(() => {
			this.firenotify.child('notify').push({
						devtoken: '',
						message: evente.eventname,
						sender: firebase.auth().currentUser.displayName,
						type: 'event'
					}).then(() => {
						resolve({ success: true}) ;
					})
		})
	  })
	  return promise;
  }
  
  addbio(bio){
	  var promise = new Promise ((resolve,reject) => {
	  this.firebios.child(this.afireauth.auth.currentUser.uid).set({
			uid: this.afireauth.auth.currentUser.uid,
			oneliner: bio.oneliner,
			name: bio.name,
			surname: bio.surname,
			occupation: bio.occupation,
			hometown: bio.hometown,
			starsign: bio.starsign,
			food: bio.food,
			music: bio.music,
			personality: bio.personality,
			height: bio.height,
			destination: bio.destination,
			env: bio.env,
			activity: bio.activity,
			badwhat: bio.badwhat,
			prefer: bio.prefer,
			outing: bio.outing,
			type: bio.type,
			stype: bio.stype

		}).then(() => {
			resolve({ success: true}) ;
		}).catch((err) => {
			reject(err);
		})
				   
	  })
	  return promise;
  }
  
  editbio(bio){
	  var promise = new Promise ((resolve,reject) => {
	  this.firebios.child(this.afireauth.auth.currentUser.uid).update({
			uid: this.afireauth.auth.currentUser.uid,
			oneliner: bio.oneliner,
			name: bio.name,
			surname: bio.surname,
			occupation: bio.occupation,
			hometown: bio.hometown,
			starsign: bio.starsign,
			food: bio.food,
			music: bio.music,
			personality: bio.personality,
			height: bio.height,
			destination: bio.destination,
			env: bio.env,
			activity: bio.activity,
			badwhat: bio.badwhat,
			prefer: bio.prefer,
			outing: bio.outing,
			type: bio.type,
			stype: bio.stype

		}).then(() => {
			resolve({ success: true}) ;
		}).catch((err) => {
			reject(err);
		})
				   
	  })
	  return promise;
  }
  
  
  
  
  
  adduser(newuser){
	  var promise = new Promise((resolve,reject) => {
		  this.afireauth.auth.createUserWithEmailAndPassword(newuser.email,newuser.password).then(() => {
			  this.afireauth.auth.currentUser.updateProfile({
				  displayName: newuser.displayName,
				  photoURL: 'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/profile.jpg?alt=media&token=8524a1eb-4659-417a-83e2-c09a940721df'
					
			  }).then(() => {
				this.firedata.child(this.afireauth.auth.currentUser.uid).set({
					uid: this.afireauth.auth.currentUser.uid,
					displayName: newuser.displayName,
					photoURL: 'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/profile.jpg?alt=media&token=8524a1eb-4659-417a-83e2-c09a940721df',
					bgURL: 'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/toes.jpg?alt=media&token=eac5b922-b32e-44fb-ae27-906cf45aa523',
					  photoURL1: 'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/placeholder.png?alt=media&token=fa1d5879-62f3-46da-b379-ef29063a0c5b',
					  photoURL2: 'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/placeholder.png?alt=media&token=fa1d5879-62f3-46da-b379-ef29063a0c5b',
					gender: newuser.gender,
					age: newuser.age,
					devtoken: this.fcm.mytoken
				}).then(() => {
					resolve({ success: true}) ;
			      }).catch((err) => {
					  console.log("error: " + err);
				    reject(err);
			       })
		     }).catch((err) => {
				  console.log("error: " + err);
				 reject(err);
			 })  
		   })
	  })
	  return promise;
  }
  
  updatetoken(){
	 
	  var promise = new Promise((resolve,reject) => {
		  this.firedata.child(this.afireauth.auth.currentUser.uid).update({
					uid: this.afireauth.auth.currentUser.uid,
					displayName: this.afireauth.auth.currentUser.displayName,
					photoURL: this.afireauth.auth.currentUser.photoURL,
					devtoken: this.fcm.mytoken
				}).then(() => {
					resolve({ success: true}) ;
			      }).catch((err) => {
				    reject(err);
			       })
	  })
	  
	  return promise;
  }
  
   sendcommenter(userobj){
	  var promise = new Promise((resolve,reject) => {
			var fireeventchats = firebase.database().ref('/events/' + userobj.usereventname +'/comments' );
				fireeventchats.child(this.afireauth.auth.currentUser.uid).set({
					uid: this.afireauth.auth.currentUser.uid,
					displayName: this.user.displayName,
					photoURL: this.user.photoURL,
					comment: userobj.comment
				}).then(() => {
					resolve({ success: true}) ;
			      }).catch((err) => {
				    reject(err);
			       })
		       
		   })
	  
	  return promise;
  }
  
  addusertoevent(eventname1){
	  var promise = new Promise((resolve,reject) => {
	   this.getuserdetail().then((res) => {
		  this.user = res;
	  }).then(() => {
	  
		var fireeventsusers = firebase.database().ref('/events/' + eventname1 +'/attendees' );
			fireeventsusers.child(this.afireauth.auth.currentUser.uid).set({
				uid: this.user.uid,
				displayName: this.user.displayName,
				photoURL: this.user.photoURL,
				gender: this.user.gender,
				age: this.user.age
			}).then(() => {
			resolve({ success: true}) ;
			}).catch((err) => {
			alert("error: " + err);
			})
		 })
		 
	  })
		return promise;
  }
  
  addnewfeed(newsfeed){
	  var promise = new Promise((resolve,reject) => {
	   
	  
		var firefeedsusers = firebase.database().ref('/events/' + newsfeed.eventname );
			firefeedsusers.child('newsfeed').push().set({
				headline: newsfeed.headline,
				avatar: newsfeed.avatar,
				news: newsfeed.news
			}).then(() => {
			resolve({ success: true}) ;
			}).catch((err) => {
			alert("error: " + err);
			})
		 
		 
	  })
		return promise;
  }
  
  updateallimages(imageurl, bgimageurl,imageurl1,imageurl2){
	  var promise = new Promise((resolve, reject) => {
		  this.afireauth.auth.currentUser.updateProfile ({
			  displayName: this.afireauth.auth.currentUser.displayName,
			  photoURL: imageurl
		  }).then(() => {
			  firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
				  uid: this.afireauth.auth.currentUser.uid,
					displayName: this.afireauth.auth.currentUser.displayName,
					photoURL: imageurl,
					bgURL: bgimageurl,
					  photoURL1: imageurl1,
					  photoURL2: imageurl2
				  
			  }).then(() => {
				  resolve({success: true});
			  }).catch((err) => {
				  reject(err);
			  })
		  }).catch((err) => {
			  reject(err);
		  }) 
	  })
	  return promise;
  }
  
 
  
	getuserdetail(){
		var promise = new Promise((resolve,reject) => {
			this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
				resolve(snapshot.val());
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	getuserdetails(user){
		console.log("no child here");
		var promise = new Promise((resolve,reject) => {
			console.log("no child here 2");
			this.firedata.child(user).once('value', (snapshot) => {
				console.log("child here 3");
				resolve(snapshot.val());
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	getbiodetail(){
		console.log("no child here a");
		var promise = new Promise((resolve,reject) => {
			console.log("no child here 2a");
			this.firebios.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
				console.log("child here 3a");
				resolve(snapshot.val());
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	getbiodetails(user){
		console.log("no child here b");
		var promise = new Promise((resolve,reject) => {
			console.log("no child here 2b");
			this.firebios.child(user).once('value', (snapshot) => {
				console.log("child here 3b");
				resolve(snapshot.val());
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	
	getallusers(){
		var promise = new Promise((resolve, reject) => {
			
			this.firedata.orderByChild('uid').once('value', (snapshot) => {
				let userdata = snapshot.val();
				let temparr = [];
				for(var key in userdata){
					temparr.push(userdata[key]);
				}
				resolve(temparr);
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	geteventfeed(eventname){
		var promise = new Promise((resolve, reject) => {
		  var firefeedsusers = firebase.database().ref('/events/' + eventname + '/newsfeed' );

			firefeedsusers.orderByChild('timestamp').once('value', (snapshot) => {
				let userdata = snapshot.val();
				let temparr = [];
				for(var key in userdata){
					temparr.push(userdata[key]);
				}
				resolve(temparr);
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}
	
	getallusersattending(eventname1){
		var promise = new Promise((resolve, reject) => {
		var fireeventsusers = firebase.database().ref('/events/' + eventname1 +'/attendees' );	
			fireeventsusers.orderByChild('uid').once('value', (snapshot) => {
				let userdata = snapshot.val();
				let temparr = [];
				console.log("err1");
				for(var key in userdata){
					temparr.push(userdata[key]);
					console.log("displaying user" + userdata[key] + ", ");
				}
				console.log("returning array" + temparr);
				resolve(temparr);
			}).catch((err) => {
				console.log("error caught: " + err);
				reject(err);
			})
		})
		return promise;
	}
	
	getmaleusers(eventname1){
		var promise = new Promise((resolve, reject) => {
			var fireeventsusers = firebase.database().ref('/events/' + eventname1 +'/attendees' );
			fireeventsusers.orderByChild('uid').once('value', (snapshot) => {
				let userdata = snapshot.val();
				let temparr = [];
				console.log("err1");
				for(var key in userdata){
					if(userdata[key].gender == 'Male'){
					temparr.push(userdata[key]);
					}
					console.log("displaying user" + userdata[key] + ", ");
				}
				console.log("returning array" + temparr);
				resolve(temparr);
			}).catch((err) => {
				console.log("error caught: " + err);
				reject(err);
			})
		})
		return promise;
	}
	getfemaleusers(eventname1){
		var promise = new Promise((resolve, reject) => {
			var fireeventsusers = firebase.database().ref('/events/' + eventname1 +'/attendees' );
			fireeventsusers.orderByChild('uid').once('value', (snapshot) => {
				let userdata = snapshot.val();
				let temparr = [];
				console.log("err1");
				for(var key in userdata){
					if(userdata[key].gender == 'Female'){
					temparr.push(userdata[key]);
					}
					console.log("displaying user" + userdata[key] + ", ");
				}
				console.log("returning array" + temparr);
				resolve(temparr);
			}).catch((err) => {
				console.log("error caught: " + err);
				reject(err);
			})
		})
		return promise;
	}
	
	getotherusers(eventname1){
		var promise = new Promise((resolve, reject) => {
			var fireeventsusers = firebase.database().ref('/events/' + eventname1 +'/attendees' );
			fireeventsusers.orderByChild('uid').once('value', (snapshot) => {
				let userdata = snapshot.val();
				let temparr = [];
				console.log("err1");
				for(var key in userdata){
					if(userdata[key].gender == 'Transgender'){
					temparr.push(userdata[key]);
					}
					console.log("displaying user" + userdata[key] + ", ");
				}
				console.log("returning array" + temparr);
				resolve(temparr);
			}).catch((err) => {
				console.log("error caught: " + err);
				reject(err);
			})
		})
		return promise;
	}
	
		getallevents(){
			
		var promise = new Promise((resolve, reject) => {
			console.log("err 1");
			this.fireevents.orderByChild('eventname').once('value', (snapshot) => {
				console.log("err las");
				let eventsdata = snapshot.val();
				let temparr = [];
				for(var key in eventsdata){
					temparr.push(eventsdata[key]);
			
				}
				
				resolve(temparr);
			}).catch((err) => {
			
				reject(err);
			})
		})
		return promise;
	}
}
