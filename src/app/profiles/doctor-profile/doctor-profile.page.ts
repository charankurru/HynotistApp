import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TakeAppointComponent } from '../../Components/take-appoint/take-appoint.component';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../Components/popover/popover.component';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {
  constructor(
    private modalController: ModalController,
    public popoverController: PopoverController
  ) {}
  email: string;

  payload: any;
  loading: boolean;
  fullname: string;

  password: string;

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: TakeAppointComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
