import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TakeAppointComponent } from '../../Components/take-appoint/take-appoint.component';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../Components/popover/popover.component';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../Shared/doctor.service';
import { PackageDetailsComponent } from 'src/app/Components/package-details/package-details.component';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {
  isloading: boolean;
  constructor(
    private modalController: ModalController,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private doc: DoctorService
  ) {}
  email: string;

  payload: any;
  loading: boolean;
  fullname: string;
  doctordetails: any;

  password: string;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2,
    speed: 400,
  };

  categories = {
    slidesPerView: 2,
  };

  profileSettings = [
    { text: 'Make a Text Querie', icon: 'text', forwardIcon: true },
    { text: 'My Video Consultation', icon: 'videocam', forwardIcon: true },
    { text: 'My Reports', icon: 'document', forwardIcon: true },
  ];

  ngOnInit() {
    this.isloading = true;
    const id = this.route.snapshot.paramMap.get('id');

    this.getSingleDoctor(id);
  }

  getSingleDoctor(id: string) {
    this.doc.getdoctor(id).subscribe((res: any) => {
      this.doctordetails = res.record;
      this.isloading = false;
    });
  }

  async presentModal(data: any) {
    const modal = await this.modalController.create({
      component: TakeAppointComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        data: this.doctordetails,
      },
    });
    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        data: this.doctordetails,
      },
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  async packageDetails(ev: any) {
    const popover = await this.popoverController.create({
      component: PackageDetailsComponent,
      cssClass: 'Packclass',
      componentProps: {
        data: this.doctordetails,
      },
      event: ev,
      animated: true,
      translucent: true,
    });
    return await popover.present();
  }
}
