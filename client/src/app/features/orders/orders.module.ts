import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent
  },
  {
    path: ':id',
    component: OrdersDetailsComponent
  }];

@NgModule({
  declarations: [OrdersListComponent, OrdersDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class OrdersModule { }
