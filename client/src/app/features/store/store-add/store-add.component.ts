import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { availabilityUnits } from 'src/app/core/const/availabilityUnits';
import { vats } from 'src/app/core/const/vat';
import { FormField } from 'src/app/core/models/formField';
import { ProductType } from 'src/app/core/models/productType';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProducerService } from 'src/app/core/services/producer.service';
import { ProductTypeService } from 'src/app/core/services/product-type.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.scss']
})
export class StoreAddComponent implements OnInit {
  formGroup!: FormGroup;
  parametersFormGroup!: FormGroup;
  categoryOptions: any[] = [];
  producerOptions: any[] = [];
  productTypeOptions: any[] = [];
  availabilityUnitsOptions: any[] = [];
  VatsOptions: any[] = [];
  productTypes: ProductType[] = [];

  formFields: FormField<string>[] = [];

  get netPrice(): string {
    const vat = this.formGroup.controls['VAT'];
    const grossPrice = this.formGroup.controls['grossPrice'];
    if(vat.valid && vat.valid && grossPrice.valid && vat.value >= 0) {
        return (grossPrice.value - (grossPrice.value * (vat.value / 100))).toFixed(2);
    } else { return ''; } };
  constructor(private readonly formBuilder: FormBuilder,
              private readonly producerService: ProducerService,
              private readonly categoryService: CategoryService,
              private readonly productTypeService: ProductTypeService,
              private readonly storeService: StoreService,
              private readonly toastr: ToastrService,
              private readonly router: Router) {}

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.producerService.getAll().toPromise().then(producers => {
      this.producerOptions = producers.map(producer => ({value: producer.id, viewValue: producer.name}));
    });

    await this.categoryService.getAll().toPromise().then(categories => {
      this.categoryOptions = categories.map(category => ({value: category.id, viewValue: category.name}));
    });

    await this.productTypeService.getAll().toPromise().then(productTypes => {
      this.productTypeOptions = productTypes.map(productType => ({value: productType.id, viewValue: productType.name}));
      this.productTypes = productTypes;
    });

    this.availabilityUnitsOptions = availabilityUnits.map(availabilityUnit => ({value: availabilityUnit, viewValue: availabilityUnit}));

    this.VatsOptions = vats;
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
    this.formGroup.value.parameters = JSON.stringify(this.formGroup.value.parameters);
    this.storeService.create(this.formGroup.value).subscribe(() => {
      this.toastr.success('Produkt został dodany');
      this.router.navigateByUrl('store');
    });
  }

  onProductTypeChange($event : MatSelectChange): void {
    const productTypeParameters = this.productTypes.filter(x => x.id === $event.value)[0].parameters;
    const formFields = JSON.parse(productTypeParameters);
    this.formFields = Object.keys(formFields).map(key =>
      new FormField<string>({
      controlType: 'textbox',
      key,
      label: key,
      required: true
    }));

    if (this.formGroup.get('parameters') != null) {this.formGroup.removeControl('parameters'); }

    const formControlArray = Object.keys(formFields).map(key => ({[key] : ['', [Validators.required]]}));
    const formControls = formControlArray.reduce((result: any, item: any) => {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

    this.parametersFormGroup = this.formBuilder.group(formControls);
    this.formGroup.addControl('parameters', this.parametersFormGroup);
  }
}
