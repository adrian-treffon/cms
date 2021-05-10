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
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./features/store-settings/store-settings.module').then(m => m.StoreSettingsModule),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./features/orders/orders.module').then(m => m.OrdersModule),
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./features/clients/clients.module').then(m => m.ClientsModule),
  },
  {
    path: 'deliveries',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./features/deliveries/deliveries.module').then(m => m.DeliveriesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
