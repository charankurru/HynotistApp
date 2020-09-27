import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './book.model';
import io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BehaviourService {
  public appoints = new BehaviorSubject<any[]>([]);
  socket: any;
  URl: string;

  constructor(private router: Router, private http: HttpClient) {
    this.URl = 'http://localhost:5000';
    this.socket = io(this.URl);
  }

  get appointsList() {
    return this.appoints.asObservable();
  }

  submitAppointment(data: any) {
    return this.http
      .post(environment.apiBaseUrl + '/postappointment', data)
      .subscribe((res) => {
        this.socket.emit('appointments', {});
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
