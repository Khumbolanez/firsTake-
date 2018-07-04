import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { ProfilerPage } from '../profiler/profiler';
import { UserProvider } from '../../providers/user/user';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';


@IonicPage()
@Component({
  selector: 'page-editpics',
  templateUrl: 'editpics.html',
})
export class EditpicsPage {
	
	imgurl: any;
    bckimgurl: any;
	imgurl2: any ;
	imgurl3: any ;
	
  constructor(public userservice: UserProvider,public tst: ToastController,public ldctrl: LoadingController,public zone: NgZone, public imgservice: ImghandlerProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad EditpicsPage');
	this.imgurl = this.navParams.get('img');
	this.bckimgurl = this.navParams.get('bck');
	this.imgurl2 = this.navParams.get('img1man');
	this.imgurl3 = this.navParams.get('img2man');
	
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
			  
			  
			  
		  })
		   toaster.setMessage('Profile image updated!');
		  toaster.present();
		 
	  }).catch((err) => {
		  loader.dismiss();
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
		 
	  }).catch((err) => {
		  loader.dismiss();
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
		 
	  }).catch((err) => {
		  loader.dismiss();
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
		 
	  }).catch((err) => {
		  loader.dismiss();
	  })
  }
  
  updateproceed(){
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  
	  this.userservice.updateallimages(this.imgurl,this.bckimgurl,this.imgurl2,this.imgurl3).then((res: any) => {
		  if(res.success){
			  toaster.setMessage('Gallery Updated');
		  toaster.present();
			  this.navCtrl.setRoot(ProfilerPage);
		  }
		  else{
			  alert('error' + res);
		  }
	  })
	  
  }

}
