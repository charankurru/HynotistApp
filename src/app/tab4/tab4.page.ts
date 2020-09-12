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
    this.userservice.userdata().subscribe(
      (res: any) => {
        this.showspinner = false;
        this.username = res.record.fullName;
        this.email = res.record.email;
      },
      (err) => console.log(err)
    );

    this.userservice.getUserPayload().then((res) => {
      this.name = res.fullName;
      //this.GetUserByname(this.name);
    });
  }

  Logout() {
    this.userservice.logout();
  }
}
