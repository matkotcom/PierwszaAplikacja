import { Component, OnInit } from '@angular/core';
// CR: Tutaj pytanie czy skoro komponent my-header znalazł się w shared, to może sidebar też powinien?
//     do zastanowienia, bo to kwestia dyskusyjna gdzie umieszczać komponenty używane w całej aplikacji
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
