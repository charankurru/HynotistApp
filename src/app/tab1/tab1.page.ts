import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Shared/user.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  showsearch: boolean;
  payload: any;
  bool: boolean;

  constructor(private router: Router, private userservice: UserService) {}

  async ngOnInit() {
    this.bool = false;
    this.payload = await this.userservice.getUserPayload();
    console.log(this.payload);
  }

  gotoprofile() {
    this.router.navigate(['doctor-profile']);
  }

  openSearch() {
    this.bool = !this.bool;
  }
}
