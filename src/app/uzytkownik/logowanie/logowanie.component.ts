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
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  zalogujUzytkownika() {
    let login = this.loginForm.get('login').value;
    let password = this.loginForm.get('password').value;
    this.uzytkownikService.zalogujUzytkownika(login, password).subscribe (
      value => {
        console.log("Otrzymana odpowiedz");
        console.log(value);
        //zapisuje name, surname, token
        this.sesjaService.clear();
        this.sesjaService.setItem('name', value['name']);
        this.sesjaService.setItem('surname', value['surname']);
        this.sesjaService.setItem('token', value['token']);
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
