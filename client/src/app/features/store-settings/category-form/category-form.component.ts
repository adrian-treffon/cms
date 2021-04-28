import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryFormComponent>,
              public readonly formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public category: Category) {}

  ngOnInit(): void {
    this.createForm();
  }

  closeDialog(): void {
    this.dialogRef.close(this.formGroup.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.category ? this.category.name : '', [Validators.required]],
      id: [this.category ? this.category.id : ''],
    });
  }


}
