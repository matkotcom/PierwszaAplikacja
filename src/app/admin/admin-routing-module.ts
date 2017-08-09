import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';

const ADMIN_ROUTES : Route[] = [
    { path: 'admin/dodaj', component: AddNewDoctorComponent }, //spr, pozniej to pewnie zmienie
    // { path: 'admin/lista/:id', component: DoctorDetailsComponent } //spr, ten komponent moze dodam w przyszlosci
]

@NgModule({
    imports: [
        RouterModule.forChild(ADMIN_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {}
