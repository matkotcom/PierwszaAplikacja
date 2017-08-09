import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [DoctorsListComponent, AddNewDoctorComponent],
  declarations: [DoctorsListComponent, AddNewDoctorComponent]
})
export class AdminModule { }
