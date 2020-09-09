import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../take-appoint/book.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  public favs = new BehaviorSubject<Book[]>([
    new Book('charan', 'Srinu', 'Hypnotist', '2019-09-05T15:05:11.855+05:30'),
  ]);

  constructor(private router: Router) {}

  get favslist() {
    return this.favs.asObservable();
  }

  // takedata(data: any) {
  //   this.appointsList.pipe(take(1)).subscribe((placings) => {
  //     console.log(placings);
  //     this.appoints.next(placings.concat(data));
  //     this.router.navigate(['home/tab2']);
  //   });
  // }
}
