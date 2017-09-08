import { Injectable } from '@angular/core';

@Injectable()
export class SesjaService {

  constructor() { }

  setItem(key:string, data:string): void {
    sessionStorage.setItem(key, data);
  }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

  getLength(): number {
    return sessionStorage.length;
  }

  czyZalogowany(): boolean {
    if (sessionStorage.length > 0 && sessionStorage.getItem('name') !== '' && sessionStorage.getItem('surname') !== '' && sessionStorage.getItem('token') !== '') {
      console.log("zalogowany true");
      return true;
    }
    else {
      console.log("zalgowany false");
      return false;
    }
  }

}
