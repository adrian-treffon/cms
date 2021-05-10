import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgxChartsModule
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
