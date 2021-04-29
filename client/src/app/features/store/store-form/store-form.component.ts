import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { availabilityUnits } from 'src/app/core/const/availabilityUnits';
import { vats } from 'src/app/core/const/vat';
import { FormField } from 'src/app/core/models/formField';
import { Product } from 'src/app/core/models/product';
import { ProductType } from 'src/app/core/models/productType';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProducerService } from 'src/app/core/services/producer.service';
import { ProductTypeService } from 'src/app/core/services/product-type.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  get netPrice(): string {
    const vat = this.formGroup.controls['VAT'];
    const grossPrice = this.formGroup.controls['grossPrice'];
    if(vat.valid && vat.valid && grossPrice.valid && vat.value >= 0) {
        return (grossPrice.value - (grossPrice.value * (vat.value / 100))).toFixed(2);
    } else { return ''; } }
  @Input() formGroup!: FormGroup;
  @Input() formBuilder!: FormBuilder;
  @Input() mode!: string;
  @Input() product!: Product;
  @Output() onSubmit = new EventEmitter<string>();

  categoryOptions: any[] = [];
  producerOptions: any[] = [];
  productTypeOptions: any[] = [];
  productTypes: ProductType[] = [];
  availabilityUnitsOptions: any[] = [];
  VatsOptions: any[] = [];
  parametersFormGroup!: FormGroup;
  formFields: FormField<string>[] = [];

  constructor(private readonly producerService: ProducerService,
              private readonly categoryService: CategoryService,
              private readonly productTypeService: ProductTypeService,
              private readonly toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await this.producerService.getAll().toPromise().then(producers => {
      if (this.mode === 'EDIT')
      {
        this.producerOptions = producers.map(producer => ({value: producer.id, viewValue: producer.name}));
      }else if (this.mode === 'ADD')
      {
        this.producerOptions = producers.filter(x => x.isActive).map(category => ({value: category.id, viewValue: category.name}));
      }
    });

    await this.categoryService.getAll().toPromise().then(categories => {
      if (this.mode === 'EDIT')
      {
        this.categoryOptions = categories.map(category => ({value: category.id, viewValue: category.name}));
      }else if (this.mode === 'ADD')
      {
        this.categoryOptions = categories.filter(x => x.isActive).map(category => ({value: category.id, viewValue: category.name}));
      }
    });

    await this.productTypeService.getAll().toPromise().then(productTypes => {
      if (this.mode === 'ADD')
      {
        this.productTypeOptions = productTypes.filter(x => x.isActive)
        .map(productType => ({value: productType.id, viewValue: productType.name}));
        this.productTypes = productTypes.filter(x => x.isActive);
      }else if (this.mode === 'EDIT')
      {
        this.productTypeOptions = productTypes.map(productType => ({value: productType.id, viewValue: productType.name}));
        this.productTypes = productTypes;
      }
    }).then(() => { this.createParametersForm(); });

    this.availabilityUnitsOptions = availabilityUnits.map(availabilityUnit => ({value: availabilityUnit, viewValue: availabilityUnit}));

    this.VatsOptions = vats;
  }

  onProductTypeChange(): void {
    this.createParametersForm();
  }

  createParametersForm(): void
  {
    const productId = this.formGroup.get('typeId');
    if (productId === null || productId?.value === '') { return; }

    const productTypeParameters = this.productTypes.filter(x => x.id === productId.value)[0].parameters;

    this.formFields = productTypeParameters.split(';').map(key =>
      new FormField<string>({
      controlType: 'textbox',
      key,
      label: key,
      required: true
    }));

    if (this.formGroup.get('parameters') != null) {this.formGroup.removeControl('parameters'); }
    let formControlArray: any[] = [];

    if(this.product){
      formControlArray = this.product.parameters.split(';').filter(x => x !== '')
      .map(key => ({[key.split(':')[0]] : [key.split(':')[1], [Validators.required]]}));
    } else {
      formControlArray = productTypeParameters.split(';').filter(x => x !== '')
      .map(key => ({[key] : ['', [Validators.required]]}));
    }

    const formControls = formControlArray.reduce((result: any, item: any) => {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

    this.parametersFormGroup = this.formBuilder.group(formControls);
    this.formGroup.addControl('parameters', this.parametersFormGroup);
  }

  onSubmitForm(): void {
    if (this.formGroup.valid) { this.onSubmit.emit(); }
    else {this.toastr.warning('Formularz zawiera błędy'); }
  }

}
