import { Component, OnInit } from '@angular/core';
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordAgain: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    })
  }

  generujToken(): string {
    let token: string = '';
    let possible = '1234567890qwertyuiopasdfghjklzxcvbnm!@#$%^&*()QWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 10; i++) {
      let char = possible.charAt(Math.floor(Math.random() * possible.length));
      token += char;
    }
    return token;
  }

  zarejestrujUzytkownika() {
    let obj = this.registerForm.value;
    let token = this.generujToken();
    obj ['token'] = token;
    obj['role'] = 'user';
    delete obj['passwordAgain']; //usuwamy pole z powtorzonym haslem
    this.uzytkownikService.zarejestrujUzytkownika(obj).subscribe(
      value => {
        console.log("Otrzymana odpowiedz");
        console.log(value);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Zarejestrowano");
      }
    )
  }

  zalogujNavigate() {
    this.router.navigate(['uzytkownik/zaloguj']);
  }

  constructor(private uzytkownikService: UzytkownikService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.buildRegisterForm();
  }

}
