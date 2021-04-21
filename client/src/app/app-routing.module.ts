import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'store',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./features/store/store.module').then(m => m.StoreModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
