import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UserProvider} from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profilebuilder',
  templateUrl: 'profilebuilder.html',
})
export class ProfilebuilderPage {
	bio = {
		oneliner: '',
		name: '',
		surname: '',
		occupation: '',
		hometown: '',
		starsign: '',
		food: '',
		personality: '',
		height: '',
		destination: '',
		env: '',
		activity: '',
		badwhat: '',
		prefer: '',
		outing: '',
		type: '',
		stype: '',
		music: ''
	}
  constructor(public navCtrl: NavController,public tst: ToastController, public navParams: NavParams,public userservice: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilebuilderPage');
  }
  
  addbio(){
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  if(this.bio.oneliner == '' ||
		this.bio.name == '' ||
		this.bio.surname == '' ||
		this.bio.occupation == '' ||
		this.bio.hometown == '' ||
		this.bio.starsign == '' ||
		this.bio.food == '' ||
		this.bio.personality == '' ||
		this.bio.height == '' ||
		this.bio.destination == '' ||
		this.bio.env == '' ||
		this.bio.activity == '' ||
		this.bio.badwhat == '' ||
		this.bio.prefer == '' ||
		this.bio.outing == '' ||
		this.bio.type == '' ||
		this.bio.music == '' ||
		this.bio.stype == '' ){
		  toaster.setMessage('You must fill in all the input fields');
		  toaster.present();
	  }
	  else{
	   this.userservice.addbio(this.bio).then((res: any) => {
		 // loader.dismiss();
		  if(res.success){
			  	 toaster.setMessage('Congratulations! You are now a member of the first Take community.');
		  toaster.present();
			this.navCtrl.setRoot(TabsPage);
		  }
		  else {
			  alert('Error: ' + res);
		  }
	  })
	  }
	  
  }

}
