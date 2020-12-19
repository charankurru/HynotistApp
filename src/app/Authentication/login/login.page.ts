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
  googleuser: any;

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
        this.loadingCtrl.dismiss();
        this.userservice.validstate.next(true);
        this.userservice.setToken(res['token'])
        
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
      cssClass: 'loading-class',
      header: 'Alert',
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'loading-class',
      message: 'Please wait...',
      mode :'ios',
      duration: 2000,
    });
    this.loading.present();
  }

  googleLogin() {
    this.presentLoading();
    this.googlePlus
      .login({})
      .then((result: any) => {
        console.log('res => ' + JSON.stringify(result));
        var body = {
          email: result.email,
          name: result.displayName,
          imgurl: result.imageUrl,
        };
        this.userservice.googleuser(body).subscribe(
          (res) => {
            this.userservice.validstate.next(true);
            this.loadingCtrl.dismiss();
            this.userservice.setToken(res['newToken']);
           
          },
          (err) => {
            this.loadingCtrl.dismiss();
            console.log(err.error.message);
            this.presentAlert(err.error.message);
          }
        );
      })
      .catch((err) => {
        console.log('error del metodo login => ' + JSON.stringify(err));
      });
  }
}

// this.userData = `Error ${JSON.stringify(err)}`
