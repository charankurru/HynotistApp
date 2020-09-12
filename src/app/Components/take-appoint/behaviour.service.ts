import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './book.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BehaviourService {
  public appoints = new BehaviorSubject<any[]>([]);

  constructor(private router: Router, private http: HttpClient) {}

  get appointsList() {
    return this.appoints.asObservable();
  }

  submitAppointment(data: any) {
    return this.http
      .post(environment.apiBaseUrl + '/postappointment', data)
      .subscribe((res) => {
        this.appointsList.pipe(take(1)).subscribe((placings) => {
          this.appoints.next(placings.concat(data));
          this.router.navigate(['home/tab2']);
        });
      });
  }

  takedata(data: any) {
    this.appointsList.pipe(take(1)).subscribe((placings) => {
      console.log(placings);
      this.appoints.next(placings.concat(data));
      this.router.navigate(['home/tab2']);
    });
  }

  checkavail(data: any) {
    return this.http.post(environment.apiBaseUrl + '/checkpossible', data);
  }
}
