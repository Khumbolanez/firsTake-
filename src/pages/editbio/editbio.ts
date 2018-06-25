import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import { ProfilerPage } from '../profiler/profiler';

@IonicPage()
@Component({
  selector: 'page-editbio',
  templateUrl: 'editbio.html',
})
export class EditbioPage {
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
		stype: ''
	}
  constructor(public navCtrl: NavController, public tst: ToastController,public navParams: NavParams,public userservice: UserProvider) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad EditbioPage');
	this.bio = this.navParams.get('bioarray');
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
		this.bio.stype == '' ){
		  toaster.setMessage('You must fill in all the input fields');
		  toaster.present();
	  }
	  else{
	   this.userservice.editbio(this.bio).then((res: any) => {
		 // loader.dismiss();
		  if(res.success){
			  	 toaster.setMessage('Updated bio');
		  toaster.present();
			this.navCtrl.setRoot(ProfilerPage);
		  }
		  else {
			  alert('Error: ' + res);
		  }
	  })
	  }
	  
  }
  
  

}
