import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { RejestracjaPacjentaComponent } from "app/pacjent/rejestracja-pacjenta/rejestracja-pacjenta.component";
import { ZapisNaWizyteComponent } from "app/pacjent/zapis-na-wizyte/zapis-na-wizyte.component";
import { RejestracjaComponent } from "app/uzytkownik/rejestracja/rejestracja.component";
import { LogowanieComponent } from "app/uzytkownik/logowanie/logowanie.component";

const UZYTKOWNIK_ROUTES: Route[] = [
    { path: 'uzytkownik/rejestracja', component: RejestracjaComponent },
    { path: 'uzytkownik/zaloguj', component: LogowanieComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(UZYTKOWNIK_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class PacjentRoutingModule {}
