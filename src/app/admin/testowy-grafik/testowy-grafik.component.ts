import { Component, OnInit } from '@angular/core';
import { TestowyService } from "app/admin/testowy.service";
import { ActivatedRoute } from "@angular/router";
import { Doctor } from "app/admin/models/doctor";
import { Grafik } from "app/admin/models/grafik";

@Component({
  selector: 'testowy-grafik',
  templateUrl: './testowy-grafik.component.html',
  styleUrls: ['./testowy-grafik.component.less'],
  providers: [TestowyService]
})
export class TestowyGrafikComponent implements OnInit {
  lekarz: Doctor;
  grafikTabSerwer: Grafik[] = [];

  ladujGrafik() {
    const id = +this.route.snapshot.params['id']; //pobieram id z url
    //dokoncz


  }

  constructor(private testowyService: TestowyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.ladujGrafik();
  }

}
