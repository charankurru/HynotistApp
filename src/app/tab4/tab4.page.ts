import { Component, OnInit } from '@angular/core';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userpayload: () => Promise<any>;
  name: any;
  username: string;
  email: string;
  showspinner: boolean;
  constructor(private userservice: UserService) {}

  async ngOnInit() {
    this.showspinner = true;
  }

  async ionViewWillEnter() {
    this.userservice.getUserPayload().then((res) => {
      this.name = res.fullName;
      this.GetUserByname(this.name);
    });
  }

  GetUserByname(name: any) {
    this.userservice.getUserbyUSername(name).subscribe(
      (data: any) => {
        console.log(data);
        this.showspinner = false;
        this.username = data.record.fullName;
        this.email = data.record.email;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Logout() {
    this.userservice.logout();
  }
}
