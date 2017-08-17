import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class TestowyService {

  constructor(private http: Http) { }

  private apiURL = 'http://date.jsontest.com/';
  // private apiURL = 'http://localhost:3000/'; //spr, rozbudowac

  // getTime(): Observable<any> {
  getTime() {
    return this.http.get(this.apiURL)
          .map(res => res.json())
  }

}
