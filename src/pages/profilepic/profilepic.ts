import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { ProfilebuilderPage } from '../profilebuilder/profilebuilder';

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})

export class ProfilepicPage {
	
	imgurl: any =  'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/profile.jpg?alt=media&token=8524a1eb-4659-417a-83e2-c09a940721df';
    bckimgurl: any =  'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/white.png?alt=media&token=99a86df4-43c2-4815-8e6b-32e7cb3ac464';
	imgurl2: any =  'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/placeholder.png?alt=media&token=fa1d5879-62f3-46da-b379-ef29063a0c5b';
	imgurl3: any =  'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/placeholder.png?alt=media&token=fa1d5879-62f3-46da-b379-ef29063a0c5b';

	propic: any = false;
	
  constructor(public userservice: UserProvider,public tst: ToastController,public ldctrl: LoadingController,public zone: NgZone, public imgservice: ImghandlerProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }
  
  chooseimage(){
	  let loader = this.ldctrl.create({
		  content:''
	  });
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  loader.present();
	  this.imgservice.uploadimage().then((uploadedurl: any) => {
		loader.dismiss();
		 this.zone.run(() => {
			  this.imgurl = uploadedurl;
			  
			  this.propic = true;
			  
		  })
		   toaster.setMessage('Profile image updated!');
		  toaster.present();
		 
	  })
  }
  
  choosebckimage(){
	  let loader = this.ldctrl.create({
		  content:''
	  });
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  loader.present();
	  this.imgservice.uploadbckimage().then((uploadedurl: any) => {
		loader.dismiss();
		 this.zone.run(() => {
			  this.bckimgurl = uploadedurl;
			  
			//  this.moveon = false;
			  
		  })
		   toaster.setMessage('Background image updated!');
		  toaster.present();
		 
	  })
  }
  chooseimage2(){
	  let loader = this.ldctrl.create({
		  content:''
	  });
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  loader.present();
	  this.imgservice.uploadimages1().then((uploadedurl: any) => {
		loader.dismiss();
		 this.zone.run(() => {
			  this.imgurl2 = uploadedurl;
			//  this.moveon = false;
			  
		  })
		   toaster.setMessage('Gallery photo 1 updated!');
		  toaster.present();
		 
	  })
  }
  
  chooseimage3(){
	  let loader = this.ldctrl.create({
		  content:''
	  });
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  loader.present();
	  this.imgservice.uploadimages2().then((uploadedurl: any) => {
		loader.dismiss();
		 this.zone.run(() => {
			  this.imgurl3 = uploadedurl;
			//  this.moveon = false;
			  
		  })
		   toaster.setMessage('Gallery photo 2 updated');
		  toaster.present();
		 
	  })
  }
  
  updateproceed(){
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  if(!this.propic){
		  toaster.setMessage('You must atleast upload a profile picture');
		  toaster.present();
	  }
	  else{
	  this.userservice.updateallimages(this.imgurl,this.bckimgurl,this.imgurl2,this.imgurl3).then((res: any) => {
		  if(res.success){
			  toaster.setMessage('Logged in Successfuly');
		  toaster.present();
			  this.navCtrl.setRoot(ProfilebuilderPage);
		  }
		  else{
			  alert(res);
		  }
	  })
	  }
  }
  


}
