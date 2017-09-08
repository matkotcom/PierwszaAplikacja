import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
// import { DoctorsListComponent } from './admin/doctors-list/doctors-list.component';
// import { AddNewDoctorComponent } from './admin/add-new-doctor/add-new-doctor.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { AdminRoutingModule } from './admin/admin-routing-module';
import { PacjentModule } from "app/pacjent/pacjent.module";
import { PacjentRoutingModule } from "app/pacjent/pacjent-routing-module";
import { UzytkownikModule } from "app/uzytkownik/uzytkownik.module";
import { SesjaService } from "app/sesja.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    CoreModule,
    AppRoutingModule,
    AdminRoutingModule,
    PacjentModule,
    PacjentRoutingModule,
    UzytkownikModule,
  ],
  providers: [SesjaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
