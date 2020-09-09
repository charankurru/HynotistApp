import { Component, OnInit } from '@angular/core';
import { PopoverService } from '../Components/popover/popover.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favouritedoctors: any;
  processing: boolean;
  constructor(private pser: PopoverService) {}

  async ngOnInit() {
    this.processing = true;
    this.pser.favslist.subscribe((res) => {
      this.favouritedoctors = res;
      console.log(this.favouritedoctors);
    });
  }
}
