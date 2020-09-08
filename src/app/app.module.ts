import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserService } from './Shared/user.service';
import { PostInterceptor } from './Shared/post-interceptor';
import { CommonModule } from '@angular/common';
import { TakeAppointComponent } from './Components/take-appoint/take-appoint.component';
import { BehaviourService } from './Components/take-appoint/behaviour.service';
import { SlidesComponent } from './Components/slides/slides.component';

@NgModule({
  declarations: [AppComponent, TakeAppointComponent, SlidesComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    BehaviourService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
