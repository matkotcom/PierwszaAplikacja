import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';
import { TestowyComponent } from './testowy/testowy.component';
import { TestowyDoctorDetailsComponent } from './testowy-doctor-details/testowy-doctor-details.component';
import { TestowyGrafikComponent } from "app/admin/testowy-grafik/testowy-grafik.component";
import { TestowyFormularzComponent } from "app/admin/testowy-formularz/testowy-formularz.component";
import { TestowyTerminDetailsComponent } from "app/admin/testowy-termin-details/testowy-termin-details.component";

const ADMIN_ROUTES : Route[] = [
    { path: 'admin/dodaj', component: AddNewDoctorComponent },  //spr usun to//spr, pozniej to pewnie zmienie
    // { path: 'admin/lista/:id', component: DoctorDetailsComponent } //spr, ten komponent moze dodam w przyszlosci
    { path: 'test', component: TestowyComponent },
    { path: 'test/:id', component: TestowyDoctorDetailsComponent },
    { path: 'test/grafik/:id', component: TestowyGrafikComponent},
    // { path: 'formularz', component: TestowyFormularzComponent}
    { path: 'test/formularz/:id', component: TestowyFormularzComponent},
    { path: 'test/formularz/edytuj/:id', component: TestowyTerminDetailsComponent }
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
