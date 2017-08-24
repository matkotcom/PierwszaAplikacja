import { Component, OnInit } from '@angular/core';
import { TestowyService } from '../testowy.service';
import { ActivatedRoute } from "@angular/router"; //dzieki temu serwisowi mozemy dostac sie do sciezki na ktorej jestesmy obecnie
import { Doctor } from "../../admin/models/doctor";

@Component({
  selector: 'testowy-doctor-details',
  templateUrl: './testowy-doctor-details.component.html',
  styleUrls: ['./testowy-doctor-details.component.less'],
  providers: [TestowyService]
})
export class TestowyDoctorDetailsComponent implements OnInit {
  lekarz: Doctor;

  constructor(private testowySerwis: TestowyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.ladujDoktora();
  }

  ladujDoktora() {
    // let id = parseInt(this.route.snapshot.params['id']); //pobieramy obecne id ze sciezki na ktorej jestesmy
    const id = +this.route.snapshot.params['id']; //pobieramy obecne id ze sciezki na ktorej jestesmy
    
    this.testowySerwis.pobierzDoktoraZSerwera(id).subscribe(
      value => {
        this.lekarz = value;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("pobieranie doktora zakonczone");
      }
    );
  }

}
