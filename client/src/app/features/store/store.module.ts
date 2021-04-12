import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [{
  path: '',
  component: StoreComponent
}];

@NgModule({
  declarations: [StoreComponent, StoreListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StoreModule { }
