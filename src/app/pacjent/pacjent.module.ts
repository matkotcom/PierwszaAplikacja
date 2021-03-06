import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RejestracjaPacjentaComponent } from './rejestracja-pacjenta/rejestracja-pacjenta.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ZapisNaWizyteComponent } from './zapis-na-wizyte/zapis-na-wizyte.component';
import { SortujTerminyPipe } from './rejestracja-pacjenta/sortuj-terminy.pipe';
import { SharedModule } from "app/shared/shared.module";
import { PanelPacjentaComponent } from './panel-pacjenta/panel-pacjenta.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RejestracjaPacjentaComponent, ZapisNaWizyteComponent, SortujTerminyPipe, PanelPacjentaComponent]
})
export class PacjentModule { }
