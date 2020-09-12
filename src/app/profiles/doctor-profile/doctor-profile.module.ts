import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorProfilePageRoutingModule } from './doctor-profile-routing.module';

import { DoctorProfilePage } from './doctor-profile.page';
import { Tab1Page } from '../../tab1/tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorProfilePageRoutingModule,
  ],
  providers: [Tab1Page],
  declarations: [DoctorProfilePage],
})
export class DoctorProfilePageModule {}
