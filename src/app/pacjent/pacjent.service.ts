import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Doctor } from "app/admin/models/doctor";
import { Termin } from "app/admin/models/termin";

@Injectable()
export class PacjentService {

  constructor(private http: Http) { }

  private apiURLLekarze = 'http://localhost:3000/api/doctors';
  private apiURLTerminy = 'http://localhost:3000/api/terminy';

  pobierzLekarzy(): Observable<Doctor[]>{
    return this.http.get(this.apiURLLekarze).map(res => res.json());
  }

  pobierzTerminy(): Observable<Termin[]> {
    return this.http.get(this.apiURLTerminy).map(res => res.json());
  }

  pobierzTermin(id: Number): Observable<Termin> {
    return this.http.get(`${this.apiURLTerminy}/${id}`).map(res => res.json());
  }

  pobierzLekarza(id: string): Observable<Doctor> {
    return this.http.get(`${this.apiURLLekarze}/${id}`).map(res => res.json());
  }

  zapiszPacjenta(id: Number, dane: any): Observable<Termin> {
    return this.http.patch(`${this.apiURLTerminy}/${id}`, dane).map(res => res.json());
  }

  pobierzTerminyPacjenta(id: string): Observable<Termin[]> {
    return this.http.get(`${this.apiURLTerminy}/?filter[where][idPacjenta]=${id}`).map(res => res.json());
  }
  
}
