import { Component, OnInit } from '@angular/core';
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SesjaService } from "app/sesja.service";

@Component({
  selector: 'logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.less'],
  providers: [UzytkownikService]
})
export class LogowanieComponent implements OnInit {

  loginForm: FormGroup;

  buildLoginForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  zalogujUzytkownika() {
    // let username = this.loginForm.get('username').value;
    // let password = this.loginForm.get('password').value;
    let dane = this.loginForm.value;
    // console.log("*****");
    // JSON.stringify(dane);
    // console.log(dane);
    // console.log("*****");
    this.uzytkownikService.zalogujUzytkownika(dane).subscribe(
      value => {
        console.log("Otrzymana odpowiedz");
        console.log(value);
        //zapisuje name, surname, token
        this.sesjaService.clear();
        this.sesjaService.setItem('token', value['id']);
        this.sesjaService.setItem('userId', value['userId']);
        let token = value['id'];
        let userId = value['userId'];
        this.uzytkownikService.pobierzDaneUzytkownika(userId, token).subscribe(
          value => {
            console.log(value);
            this.sesjaService.setItem('name', value['name']);
            this.sesjaService.setItem('surname', value['surname']);
          },
          error => {
            console.log(error);
          },
          () => {
            console.log("this.uzytkownikService.pobierzDaneUzytkownika() przetworzono");
          }
        )
        this.router.navigate(['pacjent/rejestracja'])
      },
      error => {
        console.log(error);
        alert('Niepoprawny login lub haslo, sprobuj ponownie');
      },
      () => {
        console.log("zalogujUzytkownika() przetworzono");
      }
    )
  }

  pobierzDaneUzytkownika() {

  }

  pokazZnaki() {
    let passwordInput = document.getElementsByClassName("pass")[0];
    if (passwordInput.getAttribute("type") === "password") 
      passwordInput.setAttribute("type", "text");
    else
      passwordInput.setAttribute("type", "password");
  }

  zarejestrujNavigate() {
    this.router.navigate(['uzytkownik/rejestracja']);
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
    this.loginForm = this.buildLoginForm();
  }

}
