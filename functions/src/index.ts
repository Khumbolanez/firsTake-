import * as functions from 'firebase-functions';

var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var wrotedata;
exports.Pushtrigger = functions.database.ref('/notifications/notify/{notifyId}').onWrite((change,context) => {
	wrotedata = change.after.val();
	var token = [];
	
	if(wrotedata.type == 'message'){
		token.push(wrotedata.devtoken);
		var payload = {
			"notification":{
				"title":'Message',
				"body":wrotedata.sender + ': ' + wrotedata.message,
				"sound":"default",
			},
			"data":{
				"from: ": wrotedata.sender,
				"message: " : wrotedata.message
			}
		}
		
	}
	else if(wrotedata.type == 'event'){
		
		admin.database().ref('/users').orderByChild('uid').once('value').then((alltokens) => {
			var rawtokens = alltokens.val();
			
			for(var key in rawtokens){
				token[key].push(rawtokens.detoken);
			}
		})
		
	var payload = {
		"notification":{
			"title":'FirsTake events',
			"body": 'A new event has been added: ' + wrotedata.message,
			"sound":"default",
		},
		"data":{
			"from: ": wrotedata.sender,
			"message: " : wrotedata.message
		}
	}
	
	}
	
	
	return admin.messaging().sendToDevice(token,payload).then((response) => {
		console.log('Pushed ' + wrotedata.type + ' notification');
	}).catch((err) => {
		console.log('faled to push: ' + wrotedata.type + err);
	})
})