import { Component, OnInit, Input } from '@angular/core';
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
  @Input() data: any;

  name: string;
  subject: string;
  date: any;
  session: string;
  doctorname: string = 'Steve';
  payload: any;
  loading: boolean;
  fullname: string;
  showsessions: boolean;
  timings: any[];
  showspin: boolean;

  constructor(
    private modalController: ModalController,
    private userservice: UserService,
    public loadingController: LoadingController,
    public alert: AlertController,
    public behav: BehaviourService
  ) {}

  async ngOnInit() {
    this.showsessions = false;
    this.showspin = false;
    console.log(this.data);
    this.loading = false;
    this.payload = await this.userservice.getUserPayload();
    if (this.payload) {
      this.loading = true;
      this.fullname = this.payload.fullName;
    }
  }

  radioHandler() {
    console.log(this.session);
  }

  makeAppointmentProcess() {
    this.presentAlert();
    let data = {
      username: this.name,
      doctorname: this.data.fullName,
      problem: this.subject,
      appointmentDate: this.date,
      doctorId: this.data._id,
      sessionTimings: this.session,
    };
    console.log(data);
    this.behav.submitAppointment(data);
    this.dismiss();
  }

  checkAvail() {
    this.showspin = true;
    const data = {
      id: this.data._id,
      appointmentDate: this.date,
      limitpatients: this.data.limitpatients,
      sessArr: this.data.sessionlList,
    };
    console.log(data);
    this.behav.checkavail(data).subscribe(
      (res: any) => {
        console.log(res);
        this.showspin = false;
        this.showsessions = true;
        this.timings = res.freetimmings;
      },
      (err) => {
        console.log(err);
      }
    );
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
