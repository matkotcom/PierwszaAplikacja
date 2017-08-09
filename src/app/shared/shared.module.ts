import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHeaderComponent } from './my-header/my-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MyHeaderComponent
  ],
  declarations: [MyHeaderComponent]
})
export class SharedModule { }
