import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerAddComponent } from './producer-add/producer-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreSettingsComponent } from './store-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ProductTypeAddComponent } from './product-type-add/product-type-add.component';


const routes: Routes = [{
  path: '',
  component: StoreSettingsComponent
}];

@NgModule({
  declarations: [ProducerAddComponent, StoreSettingsComponent, CategoryAddComponent, ProductTypeAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StoreSettingsModule { }
