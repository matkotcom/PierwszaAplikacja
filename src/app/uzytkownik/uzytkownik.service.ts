import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Uzytkownik } from "app/admin/models/uzytkownik";

@Injectable()
export class UzytkownikService {

  private apiURL = 'http://localhost:3000/api/Uzytkownicy';

  constructor(private http: Http) { }

  zarejestrujUzytkownika(dane: any): Observable<Uzytkownik> {
    return this.http.post(this.apiURL, dane).map(res => res.json());
  }

  zaloguj() {
    return this.http.get(this.apiURL) //spr, dokoncz
  }

}
