import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = null;
  public validstate = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    public storage: Storage,
    private plt: Platform,
    private helper: JwtHelperService
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get('token').then((token) => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.user = decoded;
          this.validstate.next(true);
        } else {
          this.storage.remove('token');
        }
      }
    });
  }

  signupUser(user: any) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  login(authCredentials: any) {
    return this.http.post(
      environment.apiBaseUrl + '/authenticate',
      authCredentials
    );
  }

  logout() {
    this.storage.remove('token').then(() => {
      this.validstate.next(false);
    });
  }

  isAuthenticated() {
    return this.validstate.value;
  }

  //Helper Methods

  async setToken(token: string) {
    this.storage.set('token', token);
  }

  async getToken() {
    return await this.storage.get('token');
  }

  deleteToken() {
    this.storage.remove('token');
  }

  gettingpayload() {
    this.storage.get('token').then((result) => {
      if (result) {
        var userPayload = atob(result.split('.')[1]);
        return JSON.parse(userPayload);
      } else return null;
    });
  }

  async getUserPayload() {
    var token = await this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  // async isLoggedIn() {
  //   console.log('well');
  //   const token = await this.getToken();
  //   return !this.helper.isTokenExpired(token);
  // }

  async IsLoggedIn() {
    console.log('ok');
    var userPayload = await this.getUserPayload();
    console.log(userPayload);
    if (userPayload.exp < Date.now() / 1000) {
      console.log('Token has  expired');
      return false;
    } else return true;
  }
}
