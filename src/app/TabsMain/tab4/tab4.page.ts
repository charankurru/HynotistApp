import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user = {
    full_name: 'Piash Sarker',
    profileImage: '../../assets/imgs/logo.png',
    coverImage: '../../',
    username: '@piashsarker',
    email: 'sarkerpt@gmail.com',
  };

  profileSettings = [
    { text: 'My Account', icon: 'person-circle-outline', forwardIcon: true },
    { text: 'My Text Queries and Answer', icon: 'text', forwardIcon: true },
    { text: 'My Video Consultation', icon: 'videocam', forwardIcon: true },
    { text: 'My Reports', icon: 'document', forwardIcon: true },
    { text: 'My Lab Orders', icon: 'flask', forwardIcon: true },
    { text: 'Saved', icon: 'cloud-download', forwardIcon: true },
  ];

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
