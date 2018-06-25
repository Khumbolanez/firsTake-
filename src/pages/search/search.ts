import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreg } from '../../models/interfaces/request';	
import { ViewprofilePage } from '../../pages/viewprofile/viewprofile';
import firebase from 'firebase';

//import { AboutPage } from '../../pages/about/about';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
	tempar = [];
	filteredusers = [];
	newrequest = {} as connreg;
  constructor(public navCtrl: NavController,public requestsservice: RequestsProvider,public alrt: AlertController,public userservice: UserProvider, public navParams: NavParams) {
	this.userservice.getallusers().then((res: any) => {
		this.filteredusers = res;
		this.tempar = res;
	})
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
	
  }
  //lets leave it here
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
		this.navCtrl.push(ViewprofilePage, {userid: person.uid})
	}
}
