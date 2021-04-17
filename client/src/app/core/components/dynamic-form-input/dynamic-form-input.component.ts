import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../models/formField';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss']
})
export class DynamicFormInputComponent {

  @Input() input!: FormField<string>;
  @Input() form!: FormGroup;

  get isValid(): boolean { return this.form.controls[this.input.key].valid; }
}
