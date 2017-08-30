import { Component, OnInit } from '@angular/core';
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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

  }

  zarejestrujNavigate() {
    this.router.navigate(['uzytkownik/rejestracja']);

  }

  constructor(private uzytkownikService: UzytkownikService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  this.loginForm = this.buildLoginForm();
  }

}
