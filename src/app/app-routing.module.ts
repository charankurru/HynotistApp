import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from './Components/slides/slides.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./TabsMain/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Authentication/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./Authentication/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'doctor-profile/:id',
    loadChildren: () =>
      import('./profiles/doctor-profile/doctor-profile.module').then(
        (m) => m.DoctorProfilePageModule
      ),
  },

  {
    path: 'slides',
    component: SlidesComponent,
  },
  {
    path: 'confirm-booking',
    loadChildren: () => import('./Pages/confirm-booking/confirm-booking.module').then( m => m.ConfirmBookingPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
