import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Shared/user.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  FirstName: string;
  loading: HTMLIonLoadingElement;

  constructor(
    public router: Router,
    private userservice: UserService,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {}

  signup() {
    this.presentLoading();
    var body = {
      fullName: this.FirstName,
      password: this.password,
      email: this.email,
    };

    this.userservice.signupUser(body).subscribe(
      (res: any) => {
        console.log(res);
       this.loadingCtrl.dismiss();
       this.presentAlert(res.message)
        return this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err.error[0]);
        this.presentAlert(err.error[0]);
      }
    );
  }

  async presentAlert(err: any) {
    const alert = await this.alertController.create({
      cssClass: 'loading-class',
      mode : 'ios',
      message: err + 'please login now',
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
}
