import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import { ProfilepicPage } from '../profilepic/profilepic';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	newuser = {
		email: '',
		password: '',
		password2: '',
		displayName: '',
		gender: '',
		age: '',
		datejoined: ''
	}
	
  constructor(public tst : ToastController, public ldCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,public userservice : UserProvider) {
	this.newuser.datejoined = new Date().toISOString().slice(0,10);
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad SignupPage');
	
  }
  
  signup(){
	  var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  let loader = this.ldCtrl.create({
		 content : 'Adding user...' 
	  });
	  
	  //var ager = +this.newuser.age;
	  var ager = Number(this.newuser.age);
	
		console.log('age captured is: ' + this.newuser.age);
	  if(this.newuser.email =='' || this.newuser.displayName =='' || this.newuser.age ==''|| this.newuser.gender ==''||this.newuser.password =='' || this.newuser.password2 ==''){
		  toaster.setMessage('All fields are required to create a new Profile!');
		  toaster.present();
	  }
	 else if(this.newuser.password.length < 7){
		 toaster.setMessage('The password must be longer than 6 characters!');
		  toaster.present();
	 }
	 else if(ager < 21){
		 toaster.setMessage('You must be atleast 21 years old, Ids will be checked at the gate of every event.');
		  toaster.present();
	 }
	 else if(this.newuser.password != this.newuser.password2){
		 toaster.setMessage('The passwords you entered do not match!');
		  toaster.present();
	 }
	 else{
			
	  loader.present();
	  this.userservice.adduser(this.newuser).then((res: any) => {
		  loader.dismiss();
		  if(res.success){
			  	 toaster.setMessage('Successfuly Signed up as '+ this.newuser.displayName);
		  toaster.present();
			this.navCtrl.setRoot(ProfilepicPage);
		  }
		  else {
			  loader.dismiss();
			  alert('Error' + res);
		  }
	  })
	 }
  }

}
