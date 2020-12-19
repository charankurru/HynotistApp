import { Component, OnInit } from '@angular/core';
import { PopoverService } from '../../Components/popover/popover.service';
import { Router } from '@angular/router';
import { UserService } from '../../Shared/user.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favouritedoctors: any[] = [];
  processing: boolean;
  payload: any;
  constructor(
    private pser: PopoverService,
    private router: Router,
    private userservice: UserService
  ) {}

  async ngOnInit() {
    this.pser.favslist.subscribe((res) => {
      console.log(res);
    //  if(this.favouritedoctors.length > 0){
    //   this.favouritedoctors = [ res[0].fullName , ...this.favouritedoctors]
    //  }
    //   console.log(this.favouritedoctors)
      this.getFavdoctor();
    });
  }

  ionViewWillEnter(){
    this.getFavdoctor();
  }

  

  getFavdoctor() {
    console.log("called")
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
