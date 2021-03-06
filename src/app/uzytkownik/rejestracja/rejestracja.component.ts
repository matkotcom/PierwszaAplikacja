import { Component, OnInit } from '@angular/core';
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SesjaService } from "app/sesja.service";

@Component({
  selector: 'rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.less'],
  providers: [UzytkownikService]
})
export class RejestracjaComponent implements OnInit {

  registerForm: FormGroup;

  buildRegisterForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // passwordAgain: ['', [Validators.required]],
      name: ['', [Validators.required], Validators.minLength(3)],
      surname: ['', [Validators.required], Validators.minLength(3)]
    })
  }

  /*generujToken(): string {
    let token: string = '';
    let possible = '1234567890qwertyuiopasdfghjklzxcvbnm!@#$%^&*()QWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 10; i++) {
      let char = possible.charAt(Math.floor(Math.random() * possible.length));
      token += char;
    }
    return token;
  }*/

  /*sprawdzLogin() {
    let login = this.registerForm.get('login').value;
    this.uzytkownikService.sprawdzDostepnoscLoginu(login).subscribe(
      value => {
        console.log("Otrzymana odpowiedz");
        console.log(value);
        if (value['count'] === 0) {
          console.log("login wolny"); //rejestrujemy
          this.zarejestrujUzytkownika();
        }
        else {
          console.log("Login zajety");
          alert("Niestety, ten login jest zajety, uzyj innego");
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("sprawdzLogin() przetworzono");
      }
    )
  }*/

  zarejestrujUzytkownika() {
    let obj = this.registerForm.value;
    // let token = this.generujToken();
    // obj ['token'] = token;
    obj['role'] = 'Pacjent';
    // delete obj['passwordAgain']; //usuwamy pole z powtorzonym haslem

    this.uzytkownikService.zarejestrujUzytkownika(obj).subscribe(
      value => {
        console.log("Otrzymana odpowiedz");
        console.log(value);
        alert("Zarejestrowano poprawnie, mozesz sie teraz zalogowac");
        this.zalogujNavigate(); //spr, odkomentuj to!
      },
      error => {
        console.log(error);
        alert("Ta nazwa uzytkownika jest juz zajeta, wybierz inna")
      },
      () => {
        console.log("zarejestrujUzytkownika() przetworzono");
      }
    )
  }

  pokazZnaki() {
    let passwordInput = document.getElementsByClassName("pass")[0];
    if (passwordInput.getAttribute("type") === "password") 
      passwordInput.setAttribute("type", "text");
    else
      passwordInput.setAttribute("type", "password");
  }

  zalogujNavigate() {
    this.router.navigate(['uzytkownik/zaloguj']);
  }

  przekierujJesliZalogowany() {
    if (this.sesjaService.czyZalogowany()) {
      console.log("przekierowano, bo uzytkownik jest zalogowany");
      this.router.navigate(['pacjent/rejestracja']);
    }
  }

  constructor(private uzytkownikService: UzytkownikService,
              private formBuilder: FormBuilder,
              private router: Router,
              private sesjaService: SesjaService) { }

  ngOnInit() {
    this.przekierujJesliZalogowany();
    this.registerForm = this.buildRegisterForm();
  }

}
