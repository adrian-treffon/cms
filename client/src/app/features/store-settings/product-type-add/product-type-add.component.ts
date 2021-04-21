import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-product-type-add',
  templateUrl: './product-type-add.component.html',
  styleUrls: ['./product-type-add.component.scss']
})
export class ProductTypeAddComponent implements OnInit {
  formGroup!: FormGroup;
  parameter: string = "";
  parameters: string[] = [];
  parametersObject: any = {};
  constructor(public dialogRef: MatDialogRef<ProductTypeAddComponent>,
              public readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
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
      name: ['', [Validators.required]],
      parameters: ['', [Validators.required]]
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
