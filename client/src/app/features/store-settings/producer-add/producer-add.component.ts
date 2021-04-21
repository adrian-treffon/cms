import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producer-add',
  templateUrl: './producer-add.component.html',
  styleUrls: ['./producer-add.component.scss']
})
export class ProducerAddComponent implements OnInit{
  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProducerAddComponent>,
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
