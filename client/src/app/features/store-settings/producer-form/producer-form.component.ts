import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producer } from 'src/app/core/models/producer';

@Component({
  selector: 'app-producer-form',
  templateUrl: './producer-form.component.html',
  styleUrls: ['./producer-form.component.scss']
})
export class ProducerFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProducerFormComponent>,
              public readonly formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public producer: Producer) {}

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
      name: [this.producer ? this.producer.name : '', [Validators.required]],
      id: [this.producer ? this.producer.id : ''],
    });
  }

}
