import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';
import { SharedModule } from '../shared/shared.module';
import { DoktorService } from '../doktor.service';
import { TestowyComponent } from './testowy/testowy.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [DoctorsListComponent, AddNewDoctorComponent, TestowyComponent],
  declarations: [DoctorsListComponent, AddNewDoctorComponent, TestowyComponent],
  providers: [DoktorService] //spr linijka dodana, usun
})
export class AdminModule { }
