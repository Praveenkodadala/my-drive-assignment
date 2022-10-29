import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
      },
      {
        path: 'userProfile',
        loadChildren: () => import('./user-profile/user-profile.module').then(mod => mod.UserProfileModule),
      },
      {
        path: 'vq',
        loadChildren: () => import('./vq/vq.module').then(mod =>mod.VqModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
      },
      {
        path: 'subscriber',
        loadChildren: () =>
          import('./subscriber/subscriber.module').then(mod=>mod.SubscriberModule)
      },
      {
        path: 'my-drive',
        loadChildren: () =>
          import('./my-drive/my-drive.module').then(mod=>mod.MyDriveModule)
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
