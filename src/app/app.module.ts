import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { ProfilerPage } from '../pages/profiler/profiler';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilepicPage } from '../pages/profilepic/profilepic';
import { SearchPage } from '../pages/search/search';
import { EventsPage } from '../pages/events/events';
import { VieweventPage} from '../pages/viewevent/viewevent';
import { DatesPage } from '../pages/dates/dates';
import { AdminPage } from '../pages/admin/admin';
import { ChattingPage } from '../pages/chatting/chatting';
import { OthereventsPage } from '../pages/otherevents/otherevents';
import { SettingsPage } from '../pages/settings/settings';
import { EditbioPage } from '../pages/editbio/editbio';
import { ViewgalleryPage } from '../pages/viewgallery/viewgallery';
import { ViewprofilePage } from '../pages/viewprofile/viewprofile';
import { EditpicsPage } from '../pages/editpics/editpics';
import { AddnewsfeedPage } from '../pages/addnewsfeed/addnewsfeed';
import { ProfilebuilderPage } from '../pages/profilebuilder/profilebuilder';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import{ AngularFireDatabaseModule } from 'angularfire2/database';
import{ AngularFireAuth } from 'angularfire2/auth';
import{ AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestsProvider } from '../providers/requests/requests';
import { EventcommentsProvider } from '../providers/eventcomments/eventcomments';
import { ChatProvider } from '../providers/chat/chat';
//

var config = {
    apiKey: "AIzaSyCyCUXMZ2D9ciuMZIP871NAXabqU7bZ8LU",
    authDomain: "complex-project-ca17a.firebaseapp.com",
    databaseURL: "https://complex-project-ca17a.firebaseio.com",
    projectId: "complex-project-ca17a",
    storageBucket: "complex-project-ca17a.appspot.com",
    messagingSenderId: "470405965597"
  };
  


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilerPage,
    HomePage,
    TabsPage,
	LoginPage,
	SignupPage,
	ProfilepicPage,
	SearchPage,
	DatesPage,
	NewsfeedPage,
	EditbioPage,
	ChattingPage,
	ViewgalleryPage,
	EditpicsPage,
	AddnewsfeedPage,
	ProfilebuilderPage,
	ViewprofilePage,
	EventsPage,
	OthereventsPage,
	SettingsPage,
	AdminPage,
	VieweventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(config),
	AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilerPage,
    HomePage,
    TabsPage,
	LoginPage,
	SignupPage,
	ProfilepicPage,
	SearchPage,
	DatesPage,
	ChattingPage,
	ViewgalleryPage,
	NewsfeedPage,
	AddnewsfeedPage,
	AdminPage,
	EditpicsPage,
	EditbioPage,
	SettingsPage,
	OthereventsPage,
	ProfilebuilderPage,
	ViewprofilePage,
	EventsPage,
	VieweventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	File,
	FileChooser,
	FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
	AngularFireAuth,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
	AngularFireDatabaseModule,
    EventcommentsProvider,
    ChatProvider
  ]
})
export class AppModule {}
