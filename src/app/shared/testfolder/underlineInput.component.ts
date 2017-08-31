import { Component, EventEmitter, Input, AfterViewInit, OnInit, Output, NgZone, ViewChild, ElementRef, HostBinding, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'underline-input',
  template: `
    <label>
      <ng-content *ngIf="customLabel" select="label"></ng-content>
      <span *ngIf="!customLabel">{{label}}</span>
    </label>
    <input #input *ngIf="!textarea" [type]="type" [disabled]="disabled" [placeholder]="placeholder" [readonly]="readonly" [maxlength]="maxLength" class="input" [ngModel]="model" (ngModelChange)="onModelChange($event)" (blur)="onBlur($event)" (focus)="onFocus($event)" />
    <textarea #input *ngIf="textarea" [disabled]="disabled" [placeholder]="placeholder" [readonly]="readonly" class="input" rows="1" autoresize class="input moz-fix" [ngModel]="model" (ngModelChange)="onModelChange($event)" (blur)="onBlur($event)" (focus)="onFocus($event)"></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UnderlineInputComponent),
      multi: true
    }
  ]
})
export class UnderlineInputComponent implements AfterViewInit, OnInit, ControlValueAccessor {
  @HostBinding('class.focused') get focused() { return this._focused; };
  @HostBinding('class.filled') get filled() { return !!this.model; };
  @Input() label: string;
  @Input() textarea = false;
  @Input() type = 'text';
  @Input() autofocus = undefined;
  @Input() placeholder = '';
  @Input() maxLength: number;
  @Input() customLabel = false;
  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(val) {
    this._readonly = val !== undefined && val !== false;
  }
  @Output('blur') externalBlur = new EventEmitter<FocusEvent>();
  @Output('focus') externalFocus = new EventEmitter<FocusEvent>();
  @ViewChild('input') input;

  model: any;
  disabled: boolean;
  private _focused: boolean;
  private _readonly: Boolean;
  private onChangeListener: (value: any) => any;
  private onTouchedListener: () => any;

  constructor(protected ngZone: NgZone) { }

  ngOnInit() {
    this.disabled = false;
    this._focused = false;
    this.onChangeListener = (_) => { };
    this.onTouchedListener = () => { };
  }

  ngAfterViewInit() {
    if (this.autofocus !== undefined && this.autofocus !== false) {
      const onStableUnsub = this.ngZone.onStable.subscribe(() => {
        this.focus();
        onStableUnsub.unsubscribe();
      });
    }
  }

  writeValue(value: any) {
    this.model = value;
  }

  registerOnChange(fn: (value: any) => any) {
    this.onChangeListener = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouchedListener = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onModelChange(value: any) {
    this.model = value;
    this.onChangeListener(this.model);
  }

  onBlur(event: FocusEvent) {
    this._focused = false;
    this.onTouchedListener();
    this.externalBlur.emit(event);
  }

  onFocus(event: FocusEvent) {
    this._focused = true;
    this.externalFocus.emit(event);
  }

  focus() {
    this.input.nativeElement.focus();
  }
}