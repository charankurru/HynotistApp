import { Component, OnInit, Input } from '@angular/core';
import { PopoverService } from './popover.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() data: any;
  constructor(
    private popser: PopoverService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  addtofav() {
    this.popser.addtofav(this.data);
  }
}
