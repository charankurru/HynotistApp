import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../Shared/user.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BehaviourService } from './behaviour.service';

import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-take-appoint',
  templateUrl: './take-appoint.component.html',
  styleUrls: ['./take-appoint.component.scss'],
})
export class TakeAppointComponent implements OnInit {
  name: string;
  subject: string;
  date: any;
  session: string;
  doctorname: string = 'Steve';
  payload: any;
  loading: boolean;
  fullname: string;

  constructor(
    private modalController: ModalController,
    private userservice: UserService,
    public loadingController: LoadingController,
    public alert: AlertController,
    public behav: BehaviourService
  ) {}

  async ngOnInit() {
    this.loading = false;
    this.payload = await this.userservice.getUserPayload();
    if (this.payload) {
      this.loading = true;
      this.fullname = this.payload.fullName;
    }
  }

  makeprocess() {
    this.presentAlert();
    let data = {
      username: this.name,
      doctor: this.doctorname,
      problem: this.subject,
      date: this.date,
    };
    this.dismiss();
    this.behav.takedata(data);
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Process',
      message: 'You will be Shortly Notified',
      buttons: ['OK'],
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
