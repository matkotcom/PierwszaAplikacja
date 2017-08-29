import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RejestracjaPacjentaComponent } from './rejestracja-pacjenta/rejestracja-pacjenta.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ZapisNaWizyteComponent } from './zapis-na-wizyte/zapis-na-wizyte.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [RejestracjaPacjentaComponent, ZapisNaWizyteComponent]
})
export class PacjentModule { }
