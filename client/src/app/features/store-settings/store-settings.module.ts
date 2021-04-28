import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreSettingsComponent } from './store-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProducerListComponent } from './producer-list/producer-list.component';
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ProducerFormComponent } from './producer-form/producer-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductTypeFormComponent } from './product-type-form/product-type-form.component';


const routes: Routes = [{
  path: '',
  component: StoreSettingsComponent
}];

@NgModule({
  declarations: [
    StoreSettingsComponent,
    CategoryListComponent,
    ProducerListComponent,
    ProductTypeListComponent,
    ProducerFormComponent,
    CategoryFormComponent,
    ProductTypeFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StoreSettingsModule { }
