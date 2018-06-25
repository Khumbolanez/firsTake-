import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';

@Injectable()
export class ImghandlerProvider {
	nativepath: any;
	firestore = firebase.storage();
  constructor(public filechooser: FileChooser) {
    console.log('Hello ImghandlerProvider Provider');
  }
  uploadimage(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpeg'});
							  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
							  imageStore.put(imgBlob).then((res) => {
								  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
									
									  resolve(url);
								  }).catch((err) => {
									 
									  reject(err);
								  })
							  }).catch((err) => {
								  
								  reject(err);
							  })
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }
  
  uploadimages1(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpeg'});
							  var imageStore = this.firestore.ref('/images1').child(firebase.auth().currentUser.uid);
							  imageStore.put(imgBlob).then((res) => {
								  this.firestore.ref('/images1').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
									
									  resolve(url);
								  }).catch((err) => {
									 
									  reject(err);
								  })
							  }).catch((err) => {
								  
								  reject(err);
							  })
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }
  
  uploadimages2(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpeg'});
							  var imageStore = this.firestore.ref('/images2').child(firebase.auth().currentUser.uid);
							  imageStore.put(imgBlob).then((res) => {
								  this.firestore.ref('/images2').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
									
									  resolve(url);
								  }).catch((err) => {
									 
									  reject(err);
								  })
							  }).catch((err) => {
								  
								  reject(err);
							  })
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }
  
  uploadbckimage(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpeg'});
							  var imageStore = this.firestore.ref('/backgroundimages').child(firebase.auth().currentUser.uid);
							  imageStore.put(imgBlob).then((res) => {
								  this.firestore.ref('/backgroundimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
									
									  resolve(url);
								  }).catch((err) => {
									 
									  reject(err);
								  })
							  }).catch((err) => {
								  
								  reject(err);
							  })
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }
  
  uploadeventimage(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpeg'});
							  var imageStore = this.firestore.ref('/eventsimages').child(firebase.auth().currentUser.uid);
							  imageStore.put(imgBlob).then((res) => {
								  this.firestore.ref('/eventsimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
									
									  resolve(url);
								  }).catch((err) => {
									 
									  reject(err);
								  })
							  }).catch((err) => {
								  
								  reject(err);
							  })
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }
  
  uploadnewsimage(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpeg'});
							  var imageStore = this.firestore.ref('/newsfeedimages').child(firebase.auth().currentUser.uid);
							  imageStore.put(imgBlob).then((res) => {
								  this.firestore.ref('/newsfeedimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
									
									  resolve(url);
								  }).catch((err) => {
									 
									  reject(err);
								  })
							  }).catch((err) => {
								  
								  reject(err);
							  })
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }

}
