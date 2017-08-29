/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZapisNaWizyteComponent } from './zapis-na-wizyte.component';

describe('ZapisNaWizyteComponent', () => {
  let component: ZapisNaWizyteComponent;
  let fixture: ComponentFixture<ZapisNaWizyteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZapisNaWizyteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapisNaWizyteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
