import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Doctor } from '../models/doctor';

@Component({
  selector: 'add-new-doctor',
  templateUrl: './add-new-doctor.component.html',
  styleUrls: ['./add-new-doctor.component.less']
})
export class AddNewDoctorComponent implements OnInit {

  @Output() doctorCreated = new EventEmitter<Doctor>();

  createDoctor(id: number, imie: string, nazwisko:string, specjalizacja:string[]) {
    this.doctorCreated.emit(new Doctor(id, imie, nazwisko, specjalizacja));
  }

  constructor() { }

  ngOnInit() {
  }

}
