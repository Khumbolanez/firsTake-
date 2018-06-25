import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-viewgallery',
  templateUrl: 'viewgallery.html',
})
export class ViewgalleryPage {
	pics =[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad ViewgalleryPage');
	this.pics = this.navParams.get('picarray');
  }

}
