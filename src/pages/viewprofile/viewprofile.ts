import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,Events} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { connreg } from '../../models/interfaces/request';
import { RequestsProvider } from '../../providers/requests/requests';
import firebase from 'firebase';
import { ViewgalleryPage } from '../viewgallery/viewgallery';



@IonicPage()
@Component({
  selector: 'page-viewprofile',
  templateUrl: 'viewprofile.html',
})
export class ViewprofilePage {
	myrequests;
	myrequests2;
  mydates;
  pics =[];
  age;
  gender;
  showthebio = true;
	avatar: string;
	buttonwork = true;
	bckavatar: string;
	img1: string;
	img2: string;
	displayName: string;
	newrequest = {} as connreg;
	showrequest;
	buttondisplay = "Send date request";
	requestbutton;
	user: any;
	bio = [];
	oneliner = {
		question: '',
		answer: '',
		pic: ''
	}
	
		name= {
			question: '',
			answer: '',
			pic: './assets/imgs/concrete.jpg'
		}
		
		elage= {
			question: '',
			answer: '',
			pic: './assets/imgs/concrete.jpg'
		}
		
		elgender= {
			question: '',
			answer: '',
			pic: './assets/imgs/concrete.jpg'
		}
		
		surname = {
			question: '',
			answer: '',
			pic: './assets/imgs/concrete.jpg'
		}
		occupation= {
		question: '',
		answer: '',
		pic: './assets/imgs/job.png'
	}
		hometown= {
		question: '',
		answer: '',
		pic: './assets/imgs/home.png'
		
	}
		starsign= {
		question: '',
		answer: '',
		pic: ''
	}
		food= {
		question: '',
		answer: '',
		pic: './assets/imgs/food.jpg'
	}
	music= {
		question: '',
		answer: '',
		pic: './assets/imgs/music.png'
	}
		personality= {
		question: '',
		answer: '',
		pic: './assets/imgs/personality.png',
		
	}
		height= {
		question: '',
		answer: '',
		pic: './assets/imgs/height.png'
	}
		destination= {
		question: '',
		answer: '',
		pic: './assets/imgs/destination.png'
	}
		env= {
		question: '',
		answer: '',
		pic: './assets/imgs/env.png'
	}
		activity= {
		question: '',
		answer: '',
		pic: './assets/imgs/activity.png'
	}
		badwhat= {
		question: '',
		answer: '',
		pic: './assets/imgs/badwhat.jpg'
	}
		prefer= {
		question: '',
		answer: '',
		pic: './assets/imgs/prefer.png'
	}
		outing= {
		question: '',
		answer: '',
		pic: './assets/imgs/outing.png'
	}
		type= {
		question: '',
		answer: '',
		pic: './assets/imgs/type.png'
	}
		stype= {
		question: '',
		answer: '',
		pic: './assets/imgs/stype.png'
	}
	
  constructor(public navCtrl: NavController,public reqservice: RequestsProvider,public alrt: AlertController,public requestsservice: RequestsProvider,public zone: NgZone,public userservice: UserProvider ,public navParams: NavParams,public events: Events) {
	
	
 }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ViewprofilePage');
	this.user = this.navParams.get('userid');
	//this.buttondisplay = true;
	this.getuserdetail();
	//this.getbiodetail();
	 this.reqservice.getmyrequests();
	 this.reqservice.getmyrequesters();
	this.reqservice.getmydates();
	this.events.subscribe('gotrequests', () => {
			this.myrequests = [];
			this.myrequests = this.reqservice.userdetails;
			var temprequests= this.myrequests;
			var temprequest = [];
			for(var key in temprequests){
					temprequest.push(temprequests[key].uid);
			}
			let index = temprequest.indexOf(this.user);
						console.log("index of req reciever is: " + index);
			
			
			if(index > -1){
				this.zone.run(() => {
				this.buttondisplay = "has sent you a date request";
				this.buttonwork = false;
				})
			}
			else{
				

			}	
			
	})
	this.events.subscribe('gotrequesters', () => {
			this.myrequests2 = [];
			this.myrequests2 = this.reqservice.userdetails2;
			var temprequests2= this.myrequests2;
			var temprequest2 = [];
			for(var key in temprequests2){
					temprequest2.push(temprequests2[key].uid);
					console.log("requesters at "+ key + " :" + temprequests2[key].uid);

			}
			let index2 = temprequest2.indexOf(this.user);
			console.log("index of req sender is: " + index2);
			if(index2 > -1){
				this.zone.run(() => {
				this.buttondisplay = "Pending request...";
				this.buttonwork = false;
				})
			}
			else{
				

			}			
	})
	this.events.subscribe('dates', () => {
			this.mydates = [];
			this.mydates = this.reqservice.mydates;
			
			var tempdates1= this.mydates;
			var tempdates = [];
			for(var key in tempdates1){
					tempdates.push(tempdates1[key].uid);
			}
			let index = tempdates.indexOf(this.user);
			if(index > -1){
				this.zone.run(() => {
				this.buttondisplay = "Date confirmed";
				this.buttonwork = false;
				})
			}
			else{

			}
			

		})	
  }
  
  getuserdetail(){
	  this.userservice.getuserdetails(this.user).then((res: any) => {
		this.zone.run(() =>{
			  this.avatar= res.photoURL;
			   this.displayName = res.displayName;
			   this.bckavatar = res.bgURL;
				this.img1 = res.photoURL1;
				this.img2 = res.photoURL2;
				this.age = res.age;
				this.gender = res.gender;
				this.pics.push(this.img1);
				this.pics.push(this.img2);
		  })
	}).then(() => {
		  this.getbiodetail();
	  })
  }
  
  ionViewWillLeave(){
	  this.bio = [];
  }
  
  showbio(){
		this.zone.run(() => {
			this.showthebio = true;
		})
	}
	showpics(){
		this.zone.run(() => {
			this.showthebio = false;
		})
	}
  
getbiodetail(){

	  
	  this.oneliner.question = 'One liner';
	  this.name.question = 'Name';
	  this.elage.question = 'Age';
	  this.elgender.question = 'Gender';
	  this.surname.question = 'Surname';
	  this.occupation.question = 'Occupation';
	  this.hometown.question = 'Home town';
	  this.starsign.question = 'Star sign';
	  this.food.question = 'Favourite food';
	  this.music.question = 'Favourite music';
	  this.personality.question = 'Introvert/Extrovert';
	  this.height.question = 'Height';
	  this.destination.question = 'Dream destination';
	  this.env.question = 'Indoor/Outdoor';
	  this.activity.question = 'Favourite activity';
	  this.badwhat.question = 'Yous a';
	  this.prefer.question = 'Personality/Physical Attraction';
	  this.outing.question = 'Braai/Night club ';
	  this.type.question = 'Formal/Casual';
	  this.stype.question = 'Love/Lust';
	   this.elage.answer = this.age;
			  this.elgender.answer = this.gender;
	  
	  this.userservice.getbiodetails(this.user).then((res: any) => {
		
		  this.zone.run(() =>{
			  this.oneliner.answer = res.oneliner,
		this.name.answer = res.name,
		this.surname.answer = res.surname,
		this.occupation.answer = res.occupation,
		this.hometown.answer = res.hometown,
		this.starsign.answer = res.starsign,
		this.food.answer= res.food,
		this.music.answer= res.music,
		this.personality.answer = res.personality,
		this.height.answer = res.height,
		this.destination.answer = res.destination,
		this.env.answer = res.env,
		this.activity.answer = res.activity,
		this.badwhat.answer = res.badwhat,
		this.prefer.answer = res.prefer,
		this.outing.answer = res.outing,
		this.type.answer = res.type,
		this.stype.answer = res.stype
		 	 
		this.starsigner();	 
			console.log('answer: ' + this.outing.answer ); 
	  this.bio.push(this.name);
	  this.bio.push(this.surname);
	  this.bio.push(this.elage);
	  this.bio.push(this.elgender);
	  this.bio.push(this.occupation);
	  this.bio.push(this.hometown);
	  this.bio.push(this.starsign);
	  this.bio.push(this.food);
	  this.bio.push(this.music);
	  this.bio.push(this.personality);
	  this.bio.push(this.height);
	  this.bio.push(this.destination);
	  this.bio.push(this.env);
	  this.bio.push(this.activity);
	  this.bio.push(this.badwhat);
	  this.bio.push(this.prefer);
	  this.bio.push(this.outing);
	  this.bio.push(this.type);
	  this.bio.push(this.stype);
	  console.log('array blah: ' + this.bio ); 
		  })
		  console.log('array skr: ' + this.bio ); 
	  })
	  console.log('array ayy: ' + this.bio ); 
  }
  
  surerequest(recipient){
	  
  let alerte = this.alrt.create({
    title: 'Are you sure you want to request this date?',
    
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: data => {
          //this.pagenote = data.note;
			this.sendreq(recipient);
          
        }
      }
    ]
  });
  alerte.present();
  }
  
   sendreq(recipient){
	   if(this.buttonwork){
	  this.newrequest.sender = firebase.auth().currentUser.uid;
	  this.newrequest.recipient = recipient;
	  console.log("sender: " + this.newrequest.sender + "recipient: " + this.newrequest.recipient );
	  if(this.newrequest.sender == this.newrequest.recipient){
		  alert("Do you love yourself that much?");
	  }
	  else{
			  let successalert = this.alrt.create({
				  title: 'Request sent',
				  subTitle: 'You requested a date from ' + this.displayName,
				  buttons: ['Cool']
			  });
		  
		  this.requestsservice.sendrequest(this.newrequest).then((res: any) => {
			  if(res.success){
				  successalert.present();
				 this.zone.run(() => {
				this.buttondisplay = "Pending request";
				this.buttonwork = false;
				})
			  }
		  }).then(() => {
			  this.requestsservice.saverequest(this.newrequest).then((res: any) => {
			  if(res.success){
				  successalert.present();
				 
			  }
			}).catch((err) => {
			  alert(err);
			})
			   
		  }).catch((err) => {
			  alert(err);
		  })
	  }
	  
	  
  }
  else{
	  alert(this.buttondisplay);
  }
  
   }
   
   starsigner(){
	  if(this.starsign.answer =='taurus'){
				this.starsign.pic = './assets/icon/tau.png';
			}
			else if(this.starsign.answer =='gemini'){
				this.starsign.pic = './assets/icon/gem.png';
			}
			else if(this.starsign.answer =='cancer'){
				this.starsign.pic = './assets/icon/can.png';
			}
			else if(this.starsign.answer =='leo'){
				this.starsign.pic = './assets/icon/leo.png';
			}
			else if(this.starsign.answer =='virgo'){
				this.starsign.pic = './assets/icon/vir.png';
			}
			else if(this.starsign.answer =='libra'){
				this.starsign.pic = './assets/icon/libra.png';
			}
			else if(this.starsign.answer =='scorpio'){
				this.starsign.pic = './assets/icon/scor.png';
			}
			else if(this.starsign.answer =='sagittarius'){
				this.starsign.pic = './assets/icon/sag.png';
			}
			else if(this.starsign.answer =='capricorn'){
				this.starsign.pic = './assets/icon/cap.png';
			}
			else if(this.starsign.answer =='aquarius'){
				this.starsign.pic = './assets/icon/aqua.png';
			}
			else if(this.starsign.answer =='pisces'){
				this.starsign.pic = './assets/icon/pic.png';
			}
			else{
				this.starsign.pic = './assets/icon/aries.png';
			}
  }
  
  opengallery(){
	  
	   this.navCtrl.push(ViewgalleryPage, {picarray: this.pics});
  }
  
  

}
