import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from './Components/slides/slides.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
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
    path: 'user-profile',
    loadChildren: () =>
      import('./profiles/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
  },

  {
    path: 'slides',
    component: SlidesComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
