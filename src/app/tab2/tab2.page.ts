import { Component, OnInit } from '@angular/core';
import { BehaviourService } from '../Components/take-appoint/behaviour.service';
import { UserService } from '../Shared/user.service';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  loadedPlaces: any;
  processing: boolean;
  payload: any;

  constructor(
    private behave: BehaviourService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.processing = true;
  }

  async ionViewWillEnter() {
    this.payload = await this.userservice.getUserPayload();
    this.getUserdata();
    this.getAppointmentsrFromBehaviourservice();

    setInterval(() => {
      this.processing = false;
    }, 3000);
  }

  getUserdata() {
    this.userservice.userdata().subscribe(
      (res: any) => {
        this.loadedPlaces = res.record.appointments;
      },
      (err) => console.log(err)
    );
  }

  getAppointmentsrFromBehaviourservice() {
    this.behave.appointsList.subscribe((res) => {
      this.userservice.getUserbyUSername(this.payload.fullName);
    });
  }
}
