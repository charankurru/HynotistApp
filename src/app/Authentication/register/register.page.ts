import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Shared/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  FirstName: string;

  constructor(
    public router: Router,
    private userservice: UserService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  signup() {
    var body = {
      fullName: this.FirstName,
      password: this.password,
      email: this.email,
    };

    this.userservice.signupUser(body).subscribe(
      (res) => {
        console.log(res);
        return this.router.navigateByUrl('/');
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
      header: 'Alert',
      message: err,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
