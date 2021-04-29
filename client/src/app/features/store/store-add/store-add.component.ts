import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.scss']
})
export class StoreAddComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(public readonly formBuilder: FormBuilder,
              private readonly storeService: StoreService,
              private readonly toastr: ToastrService,
              private readonly router: Router) {}

  async ngOnInit(): Promise<void> {
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      SKU: ['', [Validators.required]],
      name: ['', [Validators.required]],
      EAN: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isActive : [true, [Validators.required]],
      grossPrice: [null, [Validators.required]],
      VAT: [null, [Validators.required]],
      availability: ['', [Validators.required]],
      availabilityUnit: [null, [Validators.required]],
      leadTime: ['', [Validators.required]],
      notAvailableMessage: ['', [Validators.required]],
      availabilityMessage: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      producerId: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    let paramters  = '';
    Object.keys(this.formGroup.value.parameters).forEach(key => {
      paramters += `${key}:${this.formGroup.value.parameters[key]};`
    });
    this.formGroup.value.parameters = paramters;
    this.storeService.create(this.formGroup.value).subscribe(() => {
      this.toastr.success('Produkt został dodany');
      this.router.navigateByUrl('store');
    });
  }
}
