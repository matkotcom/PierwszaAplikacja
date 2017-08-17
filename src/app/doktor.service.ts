import { Injectable } from '@angular/core';

import { Doctor } from './admin/models/doctor';
import { doctorsTab } from './mock-doctors'

@Injectable()
export class DoktorService {
// losowa: number = Math.random(); //spr do testu
  constructor() { }

  getDoctors(): Doctor[] {
    return doctorsTab;
  }

}
