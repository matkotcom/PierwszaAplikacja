import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SesjaService } from "app/sesja.service";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  providers: []
})
export class SidebarComponent implements OnInit {

  name: string = '';
  surname: string = '';

  zaladujDane() {
    if (this.sesjaService.getLength() > 0) {
      this.name = this.sesjaService.getItem('name');
      this.surname = this.sesjaService.getItem('surname');
    }
    else {
      this.name = '';
      this.surname = '';
    }
  }

  wyloguj() {
    sessionStorage.clear();
    console.log("wyloguj");
    this.name = '';
    this.surname = '';
    this.router.navigate(['uzytkownik/zaloguj']);
  }

  constructor(private router: Router,
              private sesjaService: SesjaService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.zaladujDane();
  }

}
