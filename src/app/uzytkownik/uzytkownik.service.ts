import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Uzytkownik } from "app/admin/models/uzytkownik";

@Injectable()
export class UzytkownikService {

  private apiURL = 'http://localhost:3000/api/Uzytkownicy';
  private apiURL2 = 'http://localhost:3000/api/Clients';

  constructor(private http: Http) { }

  // sprawdzDostepnoscLoginu(login: string): Observable<any> {
  //   return this.http.get(`${this.apiURL}/count?[where][login]=${login}`).map(res => res.json());
  // }

  // zarejestrujUzytkownika(dane: any): Observable<Uzytkownik> {
  //   return this.http.post(this.apiURL, dane).map(res => res.json());
  // }

  // zalogujUzytkownika(login: string, password: string): Observable<Uzytkownik> {
  //   return this.http.get(`${this.apiURL}/findOne?filter[where][login]=${login}&filter[where][password]=${password}`).map(res => res.json());
  // }

  // sprawdzUprawnienia(token: string): Observable<Uzytkownik> {
  //   return this.http.get(`${this.apiURL}/findOne?filter[where][token]=${token}`).map(res => res.json());
  // }

  zarejestrujUzytkownika(dane: any): Observable<any> {
    return this.http.post(this.apiURL2, dane).map(res => res.json());
  }

  zalogujUzytkownika(dane: any): Observable<any> {
    return this.http.post(`${this.apiURL2}/login`, dane).map(res => res.json());
  }

  pobierzDaneUzytkownika(id: string, token: string): Observable<any> {
    return this.http.get(`${this.apiURL2}/${id}?access_token=${token}`).map(res => res.json());
  }

}
