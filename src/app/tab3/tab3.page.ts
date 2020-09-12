import { Component, OnInit } from '@angular/core';
import { PopoverService } from '../Components/popover/popover.service';
import { Router } from '@angular/router';
import { UserService } from '../Shared/user.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favouritedoctors: any;
  processing: boolean;
  payload: any;
  constructor(
    private pser: PopoverService,
    private router: Router,
    private userservice: UserService
  ) {}

  async ngOnInit() {
    this.payload = await this.userservice.getUserPayload();
    this.processing = true;
  }

  ionViewWillEnter() {
    this.getRecentyAddedDoctor();
  }

  getRecentyAddedDoctor() {
    this.pser.favslist.subscribe((res) => {
      this.getFavdoctor();
      this.userservice.getUserbyUSername(this.payload.fullName);
    });
  }

  getFavdoctor() {
    this.userservice.userdata().subscribe(
      (res: any) => {
        this.favouritedoctors = res.record.favlist;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  gotoprofile(id: any) {
    this.router.navigateByUrl(`/doctor-profile/${id}`);
  }
}
