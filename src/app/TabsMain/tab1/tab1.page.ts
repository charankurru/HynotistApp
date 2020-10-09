import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Shared/user.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  showsearch: boolean;
  payload: any;
  bool: boolean;
  doctorsarray: any[];
  reversearray: any[];

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -100,
  };

  categories = {
    slidesPerView: 2,
  };

  public singleuserdata = new BehaviorSubject<any>([]);

  constructor(private router: Router, private userservice: UserService) {}

  async ngOnInit() {
    this.bool = false;
    this.payload = await this.userservice.getUserPayload();
    console.log(this.payload);
    this.gettingDoctors();
    this.userservice.getUserbyUSername(this.payload.fullName);
  }

  gettingDoctors() {
    this.userservice.getDoctors().subscribe(
      (res: any) => {
        this.doctorsarray = res.doctors;
        this.reversearray = this.doctorsarray.reverse();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  gotoprofile(arr: any) {
    this.router.navigateByUrl(`/doctor-profile/${arr._id}`);
  }

  get doctordets() {
    return this.singleuserdata.asObservable();
  }

  openSearch() {
    this.bool = !this.bool;
  }
}
