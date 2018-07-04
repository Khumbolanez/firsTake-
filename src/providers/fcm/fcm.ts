import { Injectable } from '@angular/core';
import{ Firebase } from '@ionic-native/firebase';
import{ Platform } from 'ionic-angular';
import{ AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FcmProvider {
	mytoken;
  constructor(public fire: Firebase,public platform: Platform,public afs: AngularFirestore) {
    console.log('Hello FcmProvider Provider');
  }
  
  async getToken(){
	 let token;

	if(this.platform.is('android')){
		token = await this.fire.getToken();
		this.mytoken = token;
	}
	
		return this.saveTokenToFirestore(token);
  }
  
  private saveTokenToFirestore(token){
	  if(!token){

		return;
	  }
	  const devicesRef = this.afs.collection('devices');

	  const docData = {
		  token,
		  userId: 'testUser'
	  }
	  
	  return devicesRef.doc(token).set(docData);
  }
  
  listenToNotifications(){
	  return this.fire.onNotificationOpen();
  }
  
 

}
