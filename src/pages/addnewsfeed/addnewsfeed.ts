import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';



 

@IonicPage()
@Component({
  selector: 'page-addnewsfeed',
  templateUrl: 'addnewsfeed.html',
})
export class AddnewsfeedPage {
	newsfeed = {
		headline: '',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/complex-project-ca17a.appspot.com/o/IMG-20180512-WA0008(1).jpg?alt=media&token=e565f6c2-a8c4-4636-a644-027615ac3492',
		news: '',
		eventname: ''
	}
   constructor(public navCtrl: NavController,public zone: NgZone, public imgservice: ImghandlerProvider,public ldctrl: LoadingController,public tst: ToastController,public userservice: UserProvider, public navParams: NavParams) {
		this.newsfeed.eventname = this.navParams.get('nameofevent');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewsfeedPage');
  }
  
  addfeed(){
	    var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  
	    this.userservice.addnewfeed(this.newsfeed).then((res: any) => {
		  if(res.success){
		toaster.setMessage('Newsfeed:  '+ this.newsfeed.headline + ' added');
		  toaster.present();
			//this.navCtrl.setRoot(TabsPage);
		  }
		  else {
			  alert('Error' + res);
		  }
	  })
  }
  
  chooseimage(){
	  let loader = this.ldctrl.create({
		  content:'Loading image..'
	  });
	   var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  loader.present();
	  this.imgservice.uploadnewsimage().then((uploadedurl: any) => {
		loader.dismiss();
		 this.zone.run(() => {
			  this.newsfeed.avatar = uploadedurl;
			  
		  })
		   toaster.setMessage('news image loaded!');
		  toaster.present();
		 
	  })
  }

}
