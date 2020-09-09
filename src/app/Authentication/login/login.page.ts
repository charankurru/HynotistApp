import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../Shared/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  loading: any;
  payload: any;
  token: any;
  userData: any;
  constructor(
    public navctrl: NavController,
    public router: Router,
    private userservice: UserService,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private googlePlus: GooglePlus
  ) {}

  ngOnInit() {}

  registerPage() {
    return this.router.navigateByUrl('/register');
  }

  loginUser() {
    console.log(this.email);
    this.presentLoading();
    var body = {
      email: this.email,
      password: this.password,
    };
    this.userservice.login(body).subscribe(
      (res) => {
        this.userservice.validstate.next(true);
        this.router.navigateByUrl('home/tab1');
        this.userservice.setToken(res['token']).then(() => {
          this.loadingCtrl.dismiss();
        });
      },
      (err) => {
        this.loadingCtrl.dismiss();
        console.log(err.error.message);
        this.presentAlert(err.error.message);
      }
    );
  }

  async presentAlert(err: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    this.loading.present();
  }

  googleLogin() {
    this.googlePlus
      .login({
        // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        webClientId:
          '166259711506-6vl1f935u3muhdf24ra3n5khscpupt6v.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        offline: true,
      })
      .then((result) => {
        console.log('respuesta login => ' + JSON.stringify(result));
      })
      .catch((err) => {
        console.log('error del metodo login => ' + JSON.stringify(err));
      });
  }
}

// this.userData = `Error ${JSON.stringify(err)}`
