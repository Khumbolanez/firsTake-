import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, ToastController} from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { UserProvider } from '../../providers/user/user';
import { SplashScreen } from '@ionic-native/splash-screen';
import { tap } from 'rxjs/operators';
import { FcmProvider } from '../../providers/fcm/fcm';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	credentials = {} as usercreds;
	
  constructor(public navCtrl: NavController,public fcm: FcmProvider,public usepro: UserProvider,public tst : ToastController, public ldCtrl: LoadingController, public navParams: NavParams, public authservice: AuthProvider,public splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
	this.splashScreen.hide();
	 this.fcm.getToken();
		this.fcm.listenToNotifications().pipe(
			tap(msg => {
				const toast = this.tst.create({
					message: msg.body,
					duration: 3000
				});
				toast.present();
			})
			
		).subscribe()
	
	
  }
	
	signin(){
		var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });
	  let loader = this.ldCtrl.create({
		 content : 'Logging in...' 
	  });
	  loader.present();
		this.authservice.login(this.credentials).then((res: any) => {
			
			
			if(!res.code){
				toaster.setMessage('Logged in successfuly!');
		  toaster.present();
		  loader.dismiss();
			//this.usepro.usermenu();
				this.navCtrl.setRoot(TabsPage);
			}
			else{
				loader.dismiss();
				alert("failed to log in");
			}
		})
	}
	//
	signup(){
		this.navCtrl.push(SignupPage);

	}
}
