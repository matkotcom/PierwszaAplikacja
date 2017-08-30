import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    LogowanieComponent,
    RejestracjaComponent
  ],
  declarations: [LogowanieComponent, RejestracjaComponent]
})
export class UzytkownikModule { }
