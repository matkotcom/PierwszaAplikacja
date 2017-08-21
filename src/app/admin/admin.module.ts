import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';
import { SharedModule } from '../shared/shared.module';
import { DoktorService } from '../doktor.service';
import { TestowyComponent } from './testowy/testowy.component';
import { ProbnyPipe } from './testowy/probny.pipe';
import { SortujPipe } from './testowy/sortuj.pipe';
import { SortujLekarzyPipe } from './testowy/sortuj-lekarzy.pipe';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [DoctorsListComponent, AddNewDoctorComponent, TestowyComponent],
  declarations: [DoctorsListComponent, AddNewDoctorComponent, TestowyComponent, ProbnyPipe, SortujPipe, SortujLekarzyPipe],
  providers: [DoktorService] //spr linijka dodana, usun
})
export class AdminModule { }
