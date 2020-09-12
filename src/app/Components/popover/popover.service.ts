import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../take-appoint/book.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  public favs = new BehaviorSubject<Book[]>([]);

  constructor(private router: Router, private http: HttpClient) {}

  get favslist() {
    return this.favs.asObservable();
  }

  addtofav(data: any) {
    this.http
      .post(environment.apiBaseUrl + '/updatefav', data)
      .subscribe((res) => {
        console.log(res);
        this.favslist.pipe(take(1)).subscribe((placings) => {
          this.favs.next(placings.concat(data));
          this.router.navigate(['home/tab3']);
        });
      });
  }

  // takedata(data: any) {
  //   this.appointsList.pipe(take(1)).subscribe((placings) => {
  //     console.log(placings);
  //     this.appoints.next(placings.concat(data));
  //     this.router.navigate(['home/tab2']);
  //   });
  // }
}
