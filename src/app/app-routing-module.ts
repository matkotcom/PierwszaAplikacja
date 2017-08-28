import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DoctorsListComponent } from './admin/doctors-list/doctors-list.component';
import { RejestracjaPacjentaComponent } from "app/pacjent/rejestracja-pacjenta/rejestracja-pacjenta.component";

const APP_ROUTES : Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'admin/lista' },
    { path: 'admin/lista', component: DoctorsListComponent },
    { path: 'pacjent/rejestracja', component: RejestracjaPacjentaComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
