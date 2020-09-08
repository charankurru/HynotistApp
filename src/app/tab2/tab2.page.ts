import { Component, OnInit } from '@angular/core';
import { BehaviourService } from '../Components/take-appoint/behaviour.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  loadedPlaces: any;
  processing: boolean;

  constructor(private behave: BehaviourService) {}

  ngOnInit() {
    this.processing = true;
    this.behave.appointsList.subscribe((res) => {
      this.loadedPlaces = res;
      console.log(this.loadedPlaces);
    });
  }

  ionViewWillEnter() {
    setInterval(() => {
      this.processing = false;
    }, 3000);
  }
}
