import { Component, OnInit, Input, OnDestroy, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
@Component({

  selector: 'underline-multiselect',
  template: `
    <underline-input class="select-input" [(ngModel)]="inputModel" [disabled]="disabled" [readonly]="true" [label]="label" (click)="showDropdown($event)"></underline-input>
    <div class="arrow-down"></div>
    <div class="options flex-container" *ngIf="dropdownVisible">
      <div class="flex-container search" *ngIf="searchEnabled">
        <checkbox [ngModel]="selectAll" (ngModelChange)="selectAllClicked($event)"></checkbox>
        <div class="selected-number"><span i18n>Wybrano: </span>{{getSelectedOptionsNumber()}}</div>
        <div class="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" class="search-image" viewBox="0 0 20.04 19.97"><defs><style>.search-icon{fill:#adadad;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="search-icon" d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14.2A6.2,6.2,0,1,1,14.2,8,6.21,6.21,0,0,1,8,14.2Z"/><polygon class="search-icon" points="15.7 14.2 15.7 14.2 15.14 13.65 15.11 13.61 15.11 13.61 15.11 13.61 13.7 13.61 13.7 15.03 13.7 15.03 13.7 15.03 18.63 19.97 20.04 18.55 15.7 14.2"/></g></g></svg>
            <underline-input class="search-input" [(ngModel)]="searchText" ></underline-input>
            <svg (click)="clearSearch()" class="clear-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.73 12.73"><defs><style>.search-icon{fill:#adadad;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="search-icon" points="12.73 11.31 7.78 6.36 12.73 1.41 11.31 0 6.36 4.95 1.41 0 0 1.41 4.95 6.36 0 11.31 1.41 12.73 6.36 7.78 11.31 12.73 12.73 11.31"/></g></g></svg>
        </div>
      </div>
      <div *ngIf="searchEnabled" class="separator"></div>
      <div class="flex-container scrollable" *ngIf="options && options.length >0 && !isOptionGroup(options[0])">
        <div class="option" [class.list-item]="listMode" *ngFor="let option of options | filterBy:getPipeParams():searchText">
          <checkbox [ngModel]="selectedOptions[getOptionParam(option, keyParamName)]" (ngModelChange)="optionClicked($event, option)">
            <label>{{ getOptionParam(option, valueParamName) }}</label>
            <span class="description">{{option?.description}}</span>
          </checkbox>
        </div>
      </div>
      <div class="scrollable" *ngIf="options && options.length >0 && isOptionGroup(options[0])">
        <div class="option group" *ngFor="let group of options">
          <div class="flex-container">
              <div class="option" *ngFor="let opt of group | filterBy:getPipeParams():searchText">
                <checkbox  [ngModel]="selectedOptions[getOptionParam(opt, keyParamName)]" (ngModelChange)="optionClicked($event, opt)">
                  <label>{{ getOptionParam(opt, valueParamName) }} </label>
                  <span class="description">{{opt?.description}}</span>
                </checkbox>
              </div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UnderlineMultiselectComponent),
      multi: true
    }
  ]
})
export class UnderlineMultiselectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() sortResult: boolean = false;
  @Input() searchEnabled: boolean = false;
  @Input() listMode: boolean = false;
  @Input() valueParamName: string = 'value';
  @Input() keyParamName: string = '';

  model: string[] = [];
  disabled: boolean = false;
  inputModel: string = "";
  dropdownVisible: boolean;
  selectedOptions = {};
  searchText: string = "";
  selectAll: boolean = false;
  
  private documentClickSubscription: Subscription;
  private onChangeListener: (value: string[]) => any = _ => { };
  private onTouchedListener: () => any = () => { };

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.documentClickSubscription = Observable.fromEvent(document, 'click').subscribe((event: MouseEvent) => {
      if (!this.clickedInsideDropdown(event.target))
        this.dropdownVisible = false;
      this.onTouchedListener();
    });
    if (this.model && this.model.length)
      this.initOptionsModel();
  }

  ngOnDestroy() {
    if (this.documentClickSubscription)
      this.documentClickSubscription.unsubscribe();
  }

  writeValue(value: string[]) {
    this.model = value;
    this.initOptionsModel();
  }

  registerOnChange(fn: (value: string[]) => any) {
    this.onChangeListener = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouchedListener = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  optionClicked(event, option) {
    if (event)
      this.addOption(option);
    else
      this.removeOption(option)
    this.onChangeListener(this.model);
    this.setInputModel();
  }

  getOptionParam(option, param) {
    return (option && option[param]) || option;
  }

  selectAllClicked(event) {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.forEachOption((option) => { this.addOption(option) });
      this.initOptionsModel();
    } else {
      this.model = [];
      this.selectedOptions = {};
      this.inputModel = "";
    }
    this.onChangeListener(this.model);
  }

  showDropdown(event: MouseEvent) {
    if (!this.disabled) {
      this.dropdownVisible = true;
    }
  }

  isOptionGroup(option) {
    return Array.isArray(option);
  }

  clearSearch() {
    this.searchText = "";
  }

  getSelectedOptionsNumber() {
    return Object.keys(this.selectedOptions).filter(key => this.selectedOptions[key]).length;
  }

  getPipeParams() {
    if (this.options && this.options.length > 0) {
      var option = this.options[0];
      if (Array.isArray(option))
        option = option[0];
      return option[this.valueParamName] ? `${this.valueParamName}|description` : '';
    }
    return '';
  }

  private addOption(option) {
    if (!this.isOptionSelected(option)) {
      this.model.push(this.keyParamName ? option[this.keyParamName] : option);
      this.setSelectedOption(option, true);
    }
  }

  private removeOption(option) {
    var index = this.getOptionIndexInModel(option);
    if (index !== -1 && index !== undefined) {
      this.model.splice(index, 1);
      this.setSelectedOption(option, false);
    }
  }

  private setInputModel() {
    var model = this.model;

    if (this.keyParamName)
      model = model.map(item => this.options.find(option => option[this.keyParamName] === item));

    if (model.length > 0) {
      if (this.isOptionGroup(model[0]))
        model = model.reduce((prev, next) => prev.concat(next), []);
      if (typeof model[0] === 'object')
        model = model.map(item => item[this.valueParamName]);
    }
    if (this.sortResult)
      model.sort();
    this.inputModel = model.join(', ');
  }

  private initOptionsModel() {
    this.selectedOptions = {};
    if (!this.model || !this.model.length)
      this.model = [];
    this.setInputModel();
    this.forEachOption((opt) => {
      if (this.isOptionSelected(opt))
        this.setSelectedOption(opt, true);
    });
  }

  private isOptionSelected(option): boolean {
    var optionIndex = this.getOptionIndexInModel(option);
    return optionIndex !== undefined && optionIndex !== -1;
  }

  private getOptionIndexInModel(option): number {
    if (option[this.keyParamName])
      return this.model.findIndex(el => el === option[this.keyParamName]);
    return this.model.indexOf(option);
  }

  private setSelectedOption(option, isSelected) {
    if (typeof option !== 'object')
      this.selectedOptions[option] = isSelected;
    else
      this.selectedOptions[option[this.keyParamName]] = isSelected;
  }

  private forEachOption(cb) {
    this.options.forEach((option, i) => {
      if (this.isOptionGroup(option))
        option.forEach((opt) => { cb(opt); });
      else
        cb(option);
    });
  }

  private clickedInsideDropdown(element) {
    if (element === this.elementRef.nativeElement)
      return true;
    else {
      const parent = element.parentElement;
      if (parent)
        return this.clickedInsideDropdown(parent);
      else
        return false;
    }
  }
}