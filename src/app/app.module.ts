import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { DoctorsListComponent } from './admin/doctors-list/doctors-list.component';
import { AddNewDoctorComponent } from './admin/add-new-doctor/add-new-doctor.component';

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
    RouterModule.forRoot([
      { path: '', component: DoctorsListComponent },
      { path: 'admin/lista', component: DoctorsListComponent },
      { path: 'admin/dodaj', component:  AddNewDoctorComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
