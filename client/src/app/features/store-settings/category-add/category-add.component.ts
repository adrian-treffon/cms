import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryAddComponent>,
              public readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  closeDialog(): void {
    this.dialogRef.close(this.formGroup.value.name);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

}
