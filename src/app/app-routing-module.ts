import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DoctorsListComponent } from './admin/doctors-list/doctors-list.component';

const APP_ROUTES : Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'admin/lista' },
    { path: 'admin/lista', component: DoctorsListComponent }
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
