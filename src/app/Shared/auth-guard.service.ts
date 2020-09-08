import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private userservice: UserService) {}

  canActivate(): boolean {
    return this.userservice.isAuthenticated();
  }
}
