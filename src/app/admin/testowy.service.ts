import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { Doctor } from './models/doctor';
import { Termin } from "app/admin/models/termin";

@Injectable()
export class TestowyService {

  constructor(private http: Http) { }

  private apiURL = 'http://localhost:3000/api/doctors';
  private apiURLtest = 'http://date.jsontest.com/';
  private apiURLtest2 = 'http://localhost:3000/api/products/';
  private apiURLTerminy = 'http://localhost:3000/api/terminy';

  getTime() {
    return this.http.get(this.apiURLtest)
          .map(res => res.json());
  }

  getData() {
    return this.http.get(this.apiURLtest2).map(res => res.json());
  }

  pobierzDoktorowZSerwera(): Observable<Doctor[]> {
    // console.log("type of return = ");
    // console.log(typeof this.http.get(this.apiURL).map(res => res.json()));
    // console.log("return = ");
    // console.log(console.log(this.http.get(this.apiURL).map(res => res.json())));
    return this.http.get(this.apiURL).map(res => res.json());
  }

  pobierzDoktoraZSerwera(id: Number): Observable<Doctor> {
    return this.http.get(`${this.apiURL}/${id}`).map(res => res.json());
  }

  wyslijDoktoraNaSerwer(dane: Doctor): Observable<Doctor> {
    // console.log("type of return = ");
    // console.log(typeof this.http.post(this.apiURL, dane).map(res => res.json()));
    // console.log("return = ");
    // console.log(console.log(this.http.post(this.apiURL, dane).map(res => res.json())));
    return this.http.post(this.apiURL, dane).map(res => res.json());
  }

  usunDoktoraZSerwera(id: Number): Observable<any> {
    return this.http.delete(this.apiURL + `/${id}`).map(res => res.json()); //.map(res => res.json() powoduje to, ze odpowiedzia nie bedzie caly Response (z polami headers, ok, status, statusText, type, url, _body) lecz tylko 'wyluskane' pole _body, czyli to co najistotniejsze w odpowiedzi z serwera. pozostale pola beda pominiete
    // return this.http.delete(this.apiURL + `/${id}`); //jesli zostawie to tak, to odpowiedzia bedzie caly obiekt Response ze wszystkimi polami a mnie raczej interesuje tylko pole _body
  }

  zaktualizujDoktoraNaSerwerze(id: Number, dane: Doctor): Observable<Doctor> {
    return this.http.put(`${this.apiURL}/${id}`, dane).map(res => res.json());
  }

  pobierzTerminyDoktoraZSerwera(id: Number): Observable<Termin[]> {
    // return this.http.get(`${this.apiURLTerminy}?filter=%7B%22where%22%3A%7B%22idLekarza%22%3A%22${id}%22%7D%7D`).map(res => res.json());
    return this.http.get(`${this.apiURLTerminy}?filter[where][idLekarza]=${id}`).map(res => res.json());
  }

  wyslijTerminNaSerwer(termin: Termin): Observable<Termin> {
    return this.http.post(this.apiURLTerminy, termin).map(res => res.json());
  }

  usunTerminZSerwera(id: Number): Observable<any> {
    return this.http.delete(`${this.apiURLTerminy}/${id}`).map(res => res.json());
  }

  pobierzTerminZSerwera(id: Number): Observable<Termin> {
    return this.http.get(`${this.apiURLTerminy}/${id}`).map(res => res.json());
  }

  zaktualizujTerminNaSerwerze(id: Number, dane: Termin): Observable<Termin> {
    return this.http.put(`${this.apiURLTerminy}/${id}`, dane).map(res => res.json());
  }

}
