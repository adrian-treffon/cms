import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { availabilityUnits } from 'src/app/core/const/availabilityUnits';
import { vats } from 'src/app/core/const/vat';



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
  categoryOptions: any[] = [];
  producerOptions: any[] = [];
  productTypeOptions: any[] = [];
  availabilityUnitsOptions: any[] = [];
  VatsOptions: any[] = [];
  get netPrice(): string {
    const vat = this.formGroup.controls['VAT'];
    const grossPrice = this.formGroup.controls['grossPrice'];
    if(vat.valid && grossPrice.valid) {
        return (grossPrice.value - (grossPrice.value*(vat.value/100))).toFixed(2);
    } else return '';
};
  constructor(private readonly formBuilder: FormBuilder,
              private readonly producerService: ProducerService,
              private readonly categoryService: CategoryService,
              private readonly productTypeService: ProductTypeService,
              private readonly storeService: StoreService) {}

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
   this.storeService.create(this.formGroup.value).subscribe(() => {
     console.log("OK")
   })
  }
}
