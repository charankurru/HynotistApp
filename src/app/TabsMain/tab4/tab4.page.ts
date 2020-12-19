import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import {ImageUploadComponent} from '../../Components/image-upload/image-upload.component'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user = {
    full_name: 'Piash Sarker',
    profileImage: '../../assets/imgs/logo.png',
    coverImage: '../../',
    username: '@piashsarker',
    email: 'sarkerpt@gmail.com',
  };

  profileSettings = [
    { text: 'My Account', icon: 'person-circle-outline', forwardIcon: true },
    { text: 'My Text Queries and Answer', icon: 'text', forwardIcon: true },
    { text: 'My Video Consultation', icon: 'videocam', forwardIcon: true },
    { text: 'My Reports', icon: 'document', forwardIcon: true },
    { text: 'My Lab Orders', icon: 'flask', forwardIcon: true },
    { text: 'Saved', icon: 'cloud-download', forwardIcon: true },
  ];

  userpayload: () => Promise<any>;
  name: any;
  username: string;
  email: string;
  showspinner: boolean;
  img: any;
  constructor(private userservice: UserService ,
    private camera: Camera, 
    private actionSheetCtrl: ActionSheetController, 
    private modalController: ModalController) {}

  async ngOnInit() {
    this.showspinner = true;
  }

  async ionViewWillEnter() {
    this.userservice.userdata().subscribe(
      (res: any) => {
        this.showspinner = false;
        this.img = res.record.UserImg;
        this.username = res.record.fullName;
        this.email = res.record.email;
      },
      (err) => console.log(err)
    );

    this.userservice.getUserPayload().then((res) => {
      this.name = res.fullName;
      //this.GetUserByname(this.name);
    });
  }

  Logout() {
    this.userservice.logout();
  }

 
  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      mode : 'ios',
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

 
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let captureDataUrl = 'data:image/jpeg;base64,' + imagePath;
       this.presentModal(captureDataUrl)
      // modal.onDidDismiss(data => {
      //   if (data && data.reload) {
      //     this.reloadImages();
      //   }
      // });
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  async presentModal(img : any) {
    const modal = await this.modalController.create({
      component: ImageUploadComponent,
      cssClass: 'my-custom-class',
      componentProps: {
         data : img
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log('modal dismissing data',JSON.stringify(data));
      this.img = data['data'];
  });
    return await modal.present();
  }

 
}
