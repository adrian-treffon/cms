import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreAddComponent } from './store-add/store-add.component';
import { DynamicFormInputComponent } from 'src/app/core/components/dynamic-form-input/dynamic-form-input.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreFormComponent } from './store-form/store-form.component';


const routes: Routes = [
{
  path: '',
  component: StoreListComponent
},
{
  path: 'add',
  component: StoreAddComponent
},
{
  path: ':id',
  component: StoreEditComponent
}];



@NgModule({
  declarations: [StoreListComponent, StoreAddComponent, StoreEditComponent, StoreFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StoreModule { }
