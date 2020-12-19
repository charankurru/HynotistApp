import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.page.html',
  styleUrls: ['./all-doctors.page.scss'],
})
export class AllDoctorsPage implements OnInit {
  payload: any;
  docarr: any;

  constructor( private userservice: UserService , public router: Router) { }

  async ngOnInit() {
    this.payload = await this.userservice.getUserPayload();
    this.gettingDoctors();
  }

  gettingDoctors() {
    this.userservice.getDoctors().subscribe(
      (res: any) => {
        console.log(res);
        this.docarr = res.doctors;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  gotoprofile(arr: any) {
    this.router.navigateByUrl(`/doctor-profile/${arr._id}`);
  }



}
