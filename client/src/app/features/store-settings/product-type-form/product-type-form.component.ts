import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ProductType } from 'src/app/core/models/productType';

@Component({
  selector: 'app-product-type-form',
  templateUrl: './product-type-form.component.html',
  styleUrls: ['./product-type-form.component.scss']
})
export class ProductTypeFormComponent implements OnInit {

  formGroup!: FormGroup;
  parameter: string = '';
  parameters: string[] = [];
  parametersObject: any = {};
  constructor(public dialogRef: MatDialogRef<ProductTypeFormComponent>,
              public readonly formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public productType: ProductType) {}

  ngOnInit(): void {
    this.createForm();
    if(this.productType)
    {
      const params = JSON.parse(this.productType.parameters);
      this.parameters = Object.keys(params);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.formGroup.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  } 

  onParameterAdd(): void {
    this.parameters.push(this.parameter);
    this.parametersObject[this.parameter] = "";
    // tslint:disable-next-line: no-non-null-assertion
    this.formGroup.get('parameters')!.setValue(JSON.stringify(this.parametersObject));
    this.parameter = '';
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      id: [this.productType ? this.productType.id : ''],
      name: [this.productType ? this.productType.name : '', [Validators.required]],
      parameters: [this.productType ? this.productType.parameters : '', [Validators.required]]
    });
  }

  onSelect(event: MatSelectionListChange): void {
      // tslint:disable-next-line: no-non-null-assertion
      const prop = event.source._value![0];
      delete this.parametersObject[prop];
      this.parameters = this.parameters.filter(parameter => parameter !== prop);
      const paramsToAdd = JSON.stringify(this.parametersObject);
      // tslint:disable-next-line: no-non-null-assertion
      this.formGroup.get('parameters')!.setValue(paramsToAdd === '{}' ? '' : paramsToAdd);
  }

}
