import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../Shared/user.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BehaviourService } from './behaviour.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-take-appoint',
  templateUrl: './take-appoint.component.html',
  styleUrls: ['./take-appoint.component.scss'],
})
export class TakeAppointComponent implements OnInit {
  @Input() data: any;

  date = new Date().toISOString();
  name: string;
  subject: string;

  session: string;
  doctorname: string = 'Steve';
  payload: any;
  loading: boolean;
  fullname: string;
  showsessions: boolean;
  timings: any[];
  showspin: boolean;

  constructor(
    private modalController: ModalController,
    private userservice: UserService,
    public loadingController: LoadingController,
    public alert: AlertController,
    public behav: BehaviourService,
    public navCtrl: NavController,
    private payPal: PayPal
  ) {}

  async ngOnInit() {
    this.showsessions = false;
    this.showspin = false;
    console.log(this.data);
    this.loading = false;
    this.payload = await this.userservice.getUserPayload();
    if (this.payload) {
      this.loading = true;
      this.fullname = this.payload.fullName;
    }
  }

  radioHandler() {
    console.log(this.session);
  }

  makeAppointmentProcess() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        username: this.name,
        imgurl: this.data.imgUrl,
        doctorname: this.data.fullName,
        problem: this.subject,
        appointmentDate: this.date,
        doctorId: this.data._id,
        sessionTimings: this.session,
      },
    };

    // let data = {
    //   username: this.name,
    //   doctorname: this.data.fullName,
    //   problem: this.subject,
    //   appointmentDate: this.date,
    //   doctorId: this.data._id,
    //   sessionTimings: this.session,
    // };
    // console.log(data);
    // this.behav.submitAppointment(data);
    this.dismiss();
    this.navCtrl.navigateForward(['confirm-booking'], navigationExtras);
  }

  checkAvail() {
    this.showspin = true;

    let newbum = String(new Date(this.date));
    let latest = newbum.split(' ');
    latest.splice(4, 1);
    let bobs = latest.join(' ');
    this.date = bobs;

    const data = {
      id: this.data._id,
      appointmentDate: this.date,
      limitpatients: this.data.limitpatients,
      sessArr: this.data.sessionlList,
    };
    console.log(data);

    this.behav.checkavail(data).subscribe(
      (res: any) => {
        console.log(res);
        this.showspin = false;
        this.showsessions = true;
        this.timings = res.freetimmings;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Process',
      message: 'You will be Shortly Notified',
      buttons: ['OK'],
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

pay(){
  this.payPal.init({
    PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    PayPalEnvironmentSandbox: 'AWl5vZW1oi9_u1A8Q0v_V5uxRb-BLyWiCwIZ7R5SdOSZBqIP2NowhZZZLCOrvH7M7Hx1dOnCN5IUWdm1'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment('3.33', 'INR', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((result) => {

        console.log(result)
        // Successfully paid
        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, (err) => {
            console.log(err)
      });
    }, (err) => {
      console.log(err)
    });
  }, (err) => {
    console.log(" error in initialization " + JSON.stringify(err))
  });
}

}
