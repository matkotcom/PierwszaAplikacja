import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DoctorsListComponent } from './admin/doctors-list/doctors-list.component';
import { RejestracjaPacjentaComponent } from "app/pacjent/rejestracja-pacjenta/rejestracja-pacjenta.component";
import { LogowanieComponent } from "app/uzytkownik/logowanie/logowanie.component";
import { RejestracjaComponent } from "app/uzytkownik/rejestracja/rejestracja.component";

const APP_ROUTES : Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'uzytkownik/zaloguj' },
    { path: 'admin/lista', component: DoctorsListComponent },
    { path: 'pacjent/rejestracja', component: RejestracjaPacjentaComponent },
    { path: 'uzytkownik/zaloguj', component: LogowanieComponent },
    { path: 'uzytkownik/rejestracja', component: RejestracjaComponent }
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
