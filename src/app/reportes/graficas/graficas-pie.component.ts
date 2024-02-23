import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DatosReporteService } from 'src/app/service/datos/datos-reporte.service';

@Component({
  selector: 'app-graficas-pie',
  templateUrl: './graficas-pie.component.html',
  styleUrls: ['./graficas-pie.component.css'],
})
export class GraficasPieComponent {
  view: [number, number] = [600, 400];

  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme: Color = {
    name: 'Custom Color Scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private datosReporteService: DatosReporteService) {}

  get single() {
    return this.datosReporteService.dataReport;
  }

  onSelect(event: any) {
    console.log(event);
  }
}
