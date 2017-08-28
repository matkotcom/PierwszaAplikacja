import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { RejestracjaPacjentaComponent } from "app/pacjent/rejestracja-pacjenta/rejestracja-pacjenta.component";

const PACJENT_ROUTES: Route[] = [
    // {  }
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
