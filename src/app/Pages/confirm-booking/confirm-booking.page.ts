import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.page.html',
  styleUrls: ['./confirm-booking.page.scss'],
})
export class ConfirmBookingPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      this.data = params;
    });
    console.log(this.data);
  }
}
