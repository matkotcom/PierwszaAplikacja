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
import { TestowyDoctorDetailsComponent } from './testowy-doctor-details/testowy-doctor-details.component';
import { RouterModule } from '@angular/router';
import { TestowyGrafikComponent } from './testowy-grafik/testowy-grafik.component';
import { TestowyFormularzComponent } from './testowy-formularz/testowy-formularz.component';
import { TestowyTerminDetailsComponent } from './testowy-termin-details/testowy-termin-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [DoctorsListComponent, AddNewDoctorComponent, TestowyComponent],
  declarations: [DoctorsListComponent, AddNewDoctorComponent, TestowyComponent, ProbnyPipe, SortujPipe, SortujLekarzyPipe, TestowyDoctorDetailsComponent, TestowyGrafikComponent, TestowyFormularzComponent, TestowyTerminDetailsComponent],
  providers: [DoktorService] //spr linijka dodana, usun
})
export class AdminModule { }
