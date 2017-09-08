import { Component } from '@angular/core';
import { SesjaService } from "app/sesja.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: []
})
export class AppComponent {

  constructor(private sesjaService: SesjaService) {} //zebym mogl ukryc nawigacje, w tamplatce app.component jest ngIf
}
