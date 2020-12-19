import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './Shared/user.service';
import { Router } from '@angular/router';
import * as  firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/tab1',
      icon: 'home',
    },
    {
      title: 'My Appointments',
      url: '/tab2',
      icon: 'albums',
    },
    {
      title: 'Favorites',
      url: '/tab3',
      icon: 'heart',
    },

    {
      title: 'Purchase History',
      url: 'purchase',
      icon: 'card',
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning',
    },
  ];
  user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userservice: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      var firebaseConfig = {
        apiKey: "AIzaSyCkTjkNnNFgI-6r1PvofLxoNw4q3MJVrVY",
        authDomain: "hypnotist-master.firebaseapp.com",
        databaseURL: "https://hypnotist-master.firebaseio.com",
        projectId: "hypnotist-master",
        storageBucket: "hypnotist-master.appspot.com",
        messagingSenderId: "878867420363",
        appId: "1:878867420363:web:402129fe4857fd03d3774e",
        measurementId: "G-LWWSG126DF"
      };
       // Initialize Firebase
       firebase.initializeApp(firebaseConfig);

      this.userservice.validstate.subscribe((state) => {
        if (state) {
          this.router.navigate(['tab1']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }

  async ngOnInit(){
    this.userservice.userstate.subscribe((res) => {
      this.user = res;
     
    });
  }

  logout() {
    this.userservice.logout();
  }
}
