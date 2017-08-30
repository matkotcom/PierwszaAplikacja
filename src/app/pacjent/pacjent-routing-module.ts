import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { RejestracjaPacjentaComponent } from "app/pacjent/rejestracja-pacjenta/rejestracja-pacjenta.component";
import { ZapisNaWizyteComponent } from "app/pacjent/zapis-na-wizyte/zapis-na-wizyte.component";

const PACJENT_ROUTES: Route[] = [
    { path: 'pacjent/rejestracja/:id', component: ZapisNaWizyteComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(PACJENT_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class PacjentRoutingModule {}
