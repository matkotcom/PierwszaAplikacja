import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LogowanieComponent,
    RejestracjaComponent
  ],
  declarations: [LogowanieComponent, RejestracjaComponent]
})
export class UzytkownikModule { }
