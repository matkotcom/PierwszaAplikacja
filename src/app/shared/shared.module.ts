import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHeaderComponent } from './my-header/my-header.component';
import { CheckboxComponent } from "app/shared/testfolder/checkbox.component";
import { UnderlineInputComponent } from "app/shared/testfolder/underlineInput.component";
import { UnderlineMultiselectComponent } from "app/shared/testfolder/underlineMultiselect.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    MyHeaderComponent,
    // CheckboxComponent, //spr, od Kaliny
    // UnderlineInputComponent, //spr, od Kaliny
    // UnderlineMultiselectComponent //spr, od Kaliny
  ],
  // declarations: [MyHeaderComponent, CheckboxComponent, UnderlineInputComponent, UnderlineMultiselectComponent]
  declarations: [MyHeaderComponent]
})
export class SharedModule { }
