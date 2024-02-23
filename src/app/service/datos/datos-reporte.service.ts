import { Injectable } from '@angular/core';

interface Report {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class DatosReporteService {
  private data: Report[] = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
    {
      name: 'Italy',
      value: 4200000,
    },
    {
      name: 'Spain',
      value: 8200000,
    },
  ];

  get dataReport() {
    return this.data;
  }
}
