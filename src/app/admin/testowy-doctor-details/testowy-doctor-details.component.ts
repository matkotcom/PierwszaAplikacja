import { Component, OnInit } from '@angular/core';
import { TestowyService } from '../testowy.service';
import { ActivatedRoute, Router } from "@angular/router"; //dzieki temu serwisowi mozemy dostac sie do sciezki na ktorej jestesmy obecnie
import { Doctor } from "../../admin/models/doctor";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'testowy-doctor-details',
  templateUrl: './testowy-doctor-details.component.html',
  styleUrls: ['./testowy-doctor-details.component.less'],
  providers: [TestowyService]
})
export class TestowyDoctorDetailsComponent implements OnInit {
  lekarz: any;
  doctorForm: FormGroup;

  buildDoctorForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      specs: ['', [Validators.required]],
      cities: ['', [Validators.required]]
    })
  }

  ladujDoktora() {
    // let id = parseInt(this.route.snapshot.params['id']); //pobieramy obecne id ze sciezki na ktorej jestesmy
    const id = +this.route.snapshot.params['id']; //pobieramy obecne id ze sciezki na ktorej jestesmy
    // console.log("snapshot.params: ");
    // console.log(this.route.snapshot.params); //to obiekt z kluczem id o wartosci jakiejs tam
    this.lekarz = this.route.snapshot.data['doctor']
    this.testowyService.pobierzDoktoraZSerwera(id).subscribe(
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

  zaktualizujDoktora() {
    //spr ponizsze kroki sa po to, aby uzytkownik mogl wpisac dane w postaci spec1,spec2,spec3 zamiast ["spec1", "spec2", "spec3"]
    let obj = this.doctorForm.value;
    let specsString: string = this.doctorForm.get('specs').value;
    let citiesString: string = this.doctorForm.get('cities').value;
    
    if (typeof specsString === "string") { //gdy nie losujemy danych wejsciowych formularza funkcja losuj() to wpisujemy je recznie w postaci spec1,spec2,spec3 czyli jest to string, musimy zrobic z tego tablice, jesli natomiast uzywamy funkcji losuj(), ona zwraca nam od razu gotowe dane w postaci tablicy, wiec nie musimy juz sie bawic
      console.log("specsString = ");
      console.log(specsString);
      console.log("typeof specsString = ");
      console.log(typeof specsString);

      let specsTab = specsString.split(',');
      obj['specs'] = specsTab;
      this.doctorForm.setValue(obj);
    }

    if (typeof citiesString === "string") { //gdy nie losujemy danych wejsciowych formularza funkcja losuj() to wpisujemy je recznie w postaci city1,city2,city3 czyli jest to string, musimy zrobic z tego tablice, jesli natomiast uzywamy funkcji losuj(), ona zwraca nam od razu gotowe dane w postaci tablicy, wiec nie musimy juz sie bawic
      console.log("citiesString = ");
      console.log(citiesString);
      console.log("typeof citiesString = ");
      console.log(typeof citiesString);

      let citiesTab = citiesString.split(','); //zamienia stringa na tab, przecinek wyznacza/oddziela elementy tablicy
      // console.log("citiesTab = ");
      // console.log(citiesTab);
      // console.log("typeof citiesTab = ");
      // console.log(typeof citiesTab);
      // console.log("Array.isArray(citiesTab) = ");
      // console.log(Array.isArray(citiesTab));

      obj['cities'] = citiesTab;
      // console.log("this.doctorForm.value = ");
      // console.log(this.doctorForm.value);
      // console.log("this.doctorForm.get('cities').value WCZESNIEJ = ");
      // console.log(this.doctorForm.get('cities').value);
      // console.log("this.doctorForm.get('cities').value TERAZ = ");
      // console.log(this.doctorForm.get('cities').value);
      // console.log("this.doctorForm.value = ");
      // console.log(this.doctorForm.value);
      this.doctorForm.setValue(obj);
    }

    // console.log("this.doctorForm = ");
    // console.log(this.doctorForm);
    // console.log("this.doctorForm.value = ");
    // console.log(this.doctorForm.value);
    // console.log("JSON.stringify(this.doctorForm.value) = ");
    // console.log(JSON.stringify(this.doctorForm.value));

    // this.testowyService.zaktualizujDoktoraNaSerwerze(this.doctorForm.get('id').value,this.doctorForm.value).subscribe(
    this.testowyService.zaktualizujDoktoraNaSerwerze(this.lekarz.id, this.doctorForm.value).subscribe(
      value => {
        console.log("ta funkcja jest wywolywana jesli metoda http zostanie poprawnie obsluzona");
        console.log("Dane doktora zostaly zaktualizowane!");
        console.log("odpowiedz z serwera (value) zmapowana i json() = ");
        console.log(value);
        this.doctorForm.reset(); //resetowanie formularza po poprawnym wyslaniu doktora
        // this.zaladujDoktorow(); //po wyslaniu doktora do bazy odswiezamy liste doktorow
      },
      error => {
        // console.log(`error status = ${error['status']}`);
        console.log(error);

        // for (let x in error) {
        //   console.log(`${x} = ${error[x]}`);
        // }
      },
      () => console.log("Wysylanie lekarza do serwera zakonczone")
    );

    this.router.navigate(['test']);
  }

  zaladujFormularz() {
    console.log("this.lekarz = ");
    console.log(this.lekarz);
    for(let x in this.lekarz) {
      console.log(`lekarz[${x}] = ${this.lekarz[x]}`);
    }
    let obj = this.doctorForm.value;
    obj['name'] = this.lekarz.name;
    obj['surname'] = this.lekarz.surname;
    obj['specs'] = this.lekarz.specs;
    obj['cities'] = this.lekarz.cities;
    this.doctorForm.setValue(obj);
  }

  constructor(private testowyService: TestowyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.ladujDoktora();
    this.doctorForm = this.buildDoctorForm();
  }

}
