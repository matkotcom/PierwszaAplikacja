import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'checkbox',
  template: `
    <div class="checkbox" (click)="toggleCheckbox()" [ngClass]="color">
      <span class="border" [ngClass]="{'is-checked': !!model}">
        <div class="tick" [ngClass]="{'is-checked': !!model}"></div>
      </span>
      <span class="checkbox-text">
        <ng-content></ng-content>
      </span>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() readonly: boolean;
  @Input() color: 'primary' | 'accent' | 'base' | 'warn' = 'primary';

  model: boolean;
  disabled: boolean;

  private onChangeListener: (value: boolean) => any = _ => { };
  private onTouchedListener: () => any = () => { };

  toggleCheckbox(){
    if((this.readonly === undefined || this.readonly === false)  && !this.disabled){
      this.model = !this.model;
      this.onChangeListener(this.model);
      this.onTouchedListener();
    }
  }

  writeValue(value: boolean) {
    this.model = value;
  }

  registerOnChange(fn: (value: boolean) => any) {
    this.onChangeListener = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouchedListener = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
