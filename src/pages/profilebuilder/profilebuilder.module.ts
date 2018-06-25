import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilebuilderPage } from './profilebuilder';

@NgModule({
  declarations: [
    ProfilebuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilebuilderPage),
  ],
})
export class ProfilebuilderPageModule {}
