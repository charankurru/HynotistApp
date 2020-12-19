import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/Shared/user.service';
import * as  firebase from 'firebase';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Input() data: any;
  imageData: any;
  desc: string;
  url : any;

  constructor(private userservice: UserService, private modalController: ModalController, public alertCtrl: AlertController) {
   }

  ngOnInit() {
    console.log( "after image picked" , this.data);
  }

  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.data, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot)=> {
        // Do something here when the data is succesfully uploaded!
        this.showSuccesfulUploadAlert();
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          this.url = downloadURL
          this.dismissing(this.url);
        }); 
      
    });
  }

  async showSuccesfulUploadAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Uploaded!',
      message : 'uploaded successfully!', 
      buttons: ['OK']
    });
     return await alert.present();
  
  }

  dismissing(urldata: any){
    this.modalController.dismiss(urldata);
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
