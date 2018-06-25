import { Component, NgZone ,ViewChild ,Renderer} from '@angular/core';
import { NavController, AlertController,ToastController,Platform } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../../pages/login/login';
import firebase from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';
import { ViewgalleryPage } from '../viewgallery/viewgallery';
import { EditbioPage } from '../editbio/editbio';
import { EditpicsPage } from '../editpics/editpics';


@Component({
  selector: 'page-profiler',
  templateUrl: 'profiler.html'
})
export class ProfilerPage {
	  @ViewChild('divy') backdivy: any;
	editbios = {
		oneliner: '',
		name: '',
		surname: '',
		occupation: '',
		hometown: '',
		starsign: '',
		food: '',
		music: '',
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
	picsarray = {
		imgurl: '',
    bckimgurl: '',
	imgurl2: '' ,
	imgurl3: '' 
	}
	avatar: string;
	pics = [];
	bckavatar: string;
	img1: string;
	img2: string;
	displayName: string;
	age;
	showthebio = true;
	gender;
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
		pic: './assets/imgs/personality.png'
		
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
	
  constructor(public navCtrl: NavController,public reqservice: RequestsProvider,public renderer: Renderer,public platform: Platform,public tst: ToastController,public alrt: AlertController, public zone: NgZone, public userservice: UserProvider,public imgservice: ImghandlerProvider) {

  }
  
  ionViewWillEnter(){
	  
	  this.loaduserdetail();
		 // this.loadbiodetail();
		 this.userservice.usermenu();
		 this.reqservice.getmyrequests();
	  
	  				
	
	
	  
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
  
  loaduserdetail(){
	  
	  this.userservice.getuserdetail().then((res: any) => {
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
				this.picsarray.imgurl = res.photoURL;
				this.picsarray.bckimgurl = res.bgURL;
				this.picsarray.imgurl2 = res.photoURL1;
				this.picsarray.imgurl3 = res.photoURL2;
				 
	  
   
		  })
	  }).then(() => {
		  this.loadbiodetail();
	  })
	  
	  
  }
  
  loadbiodetail(){

	  
	  this.oneliner.question = 'One liner';
	  this.elage.question = 'Age';
	  this.elgender.question = 'Gender';
	  this.name.question = 'Name';
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
	  
	  
	  this.userservice.getbiodetail().then((res: any) => {
		
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
		  this.editbios.oneliner = res.oneliner,
		this.editbios.name = res.name,
		this.editbios.surname = res.surname,
		this.editbios.occupation = res.occupation,
		this.editbios.hometown = res.hometown,
		this.editbios.starsign = res.starsign,
		this.editbios.food= res.food,
		this.editbios.music= res.music,
		this.editbios.personality = res.personality,
		this.editbios.height = res.height,
		this.editbios.destination = res.destination,
		this.editbios.env = res.env,
		this.editbios.activity = res.activity,
		this.editbios.badwhat = res.badwhat,
		this.editbios.prefer = res.prefer,
		this.editbios.outing = res.outing,
		this.editbios.type = res.type,
		this.editbios.stype = res.stype
		this.starsigner();			
			
			  
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
		  })
	  })
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
  
  editbio(){
	  
	   this.navCtrl.push(EditbioPage, {bioarray: this.editbios});
  }
  
  editgalla(){
	   this.navCtrl.push(EditpicsPage, {img: this.avatar,bck: this.bckavatar,img1man: this.img1,img2man: this.img2});
	  
  }
  
 

}
