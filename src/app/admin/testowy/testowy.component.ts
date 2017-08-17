import { Component, OnInit } from '@angular/core';
import { DoktorService } from '../../doktor.service';
import { Doctor } from "../../admin/models/doctor";
import { TestowyService } from '../testowy.service';

@Component({
  selector: 'testowy',
  templateUrl: './testowy.component.html',
  styleUrls: ['./testowy.component.less'],
  // providers: [DoktorService] //nie trzeba, bo dodalem go do providers w module
  providers: [TestowyService]
})
export class TestowyComponent implements OnInit {
  doctorsTab: Doctor[];
  obiekt;

  getDoctors(): void {
    this.doctorsTab = this.doktorService.getDoctors();
  }

  constructor(private doktorService: DoktorService, private testowyService: TestowyService) {
  }

  ngOnInit() {
    this.getDoctors();
  }

  getData;

  loadGetData() {
    // this.getData = "dziala";
    this.testowyService.getTime().subscribe(
      dane => this.getData = JSON.stringify(dane),
      error => console.log(error),
      () => console.log("Pobieranie danych zakonczone")
    )
  }

}
