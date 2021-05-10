import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeliveriesListComponent } from './deliveries-list/deliveries-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: DeliveriesListComponent
}];

@NgModule({
  declarations: [DeliveriesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DeliveriesModule { }
