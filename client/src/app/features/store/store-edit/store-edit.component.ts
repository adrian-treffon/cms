import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models/product';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.scss']
})
export class StoreEditComponent {
  formGroup!: FormGroup;
  product!: Product;
  loaded: boolean = false;
  constructor(private router: Router,
              public readonly formBuilder: FormBuilder,
              private readonly storeService: StoreService,
              private readonly toastr: ToastrService,
              private route: ActivatedRoute) {
    const product = this.router.getCurrentNavigation()?.extras.state?.product;
    if (product) {
      this.product = product;
      this.loaded = true;
      this.createForm();
     }
    else {
      const id = this.route.snapshot.paramMap.get('id');
      this.storeService.getById(id!).subscribe(product => {
        this.product = product;
        this.loaded = true;
        this.createForm();
      });
     }
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      id : [this.product.id],
      SKU: [this.product.sku, [Validators.required]],
      name: [this.product.name, [Validators.required]],
      EAN: [this.product.ean, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      isActive : [this.product.isActive, [Validators.required]],
      grossPrice: [this.product.grossPrice, [Validators.required]],
      VAT: [this.product.vat, [Validators.required]],
      availability: [this.product.availability, [Validators.required]],
      availabilityUnit: [this.product.availabilityUnit, [Validators.required]],
      leadTime: [this.product.leadTime, [Validators.required]],
      notAvailableMessage: [this.product.notAvailableMessage, [Validators.required]],
      availabilityMessage: [this.product.availabilityMessage, [Validators.required]],
      categoryId: [this.product.category.id, [Validators.required]],
      producerId: [this.product.producer.id, [Validators.required]],
      typeId: [this.product.type.id, [Validators.required]],
    });
  }

  onSubmit(): void {
    let paramters  = '';
    Object.keys(this.formGroup.value.parameters).forEach(key => {
      paramters += `${key}:${this.formGroup.value.parameters[key]};`
    });
    this.formGroup.value.parameters = paramters;
    this.storeService.edit(this.formGroup.value).subscribe(() => {
      this.toastr.success('Zmiany zostały zapisane');
      this.router.navigateByUrl('store');
     });
  }

}
