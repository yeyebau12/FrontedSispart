import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { FacturaServiceService } from 'src/app/service/factura/factura.service';

@Component({
  selector: 'app-detail-factura',
  templateUrl: './detail-factura.component.html',
  styleUrls: ['./detail-factura.component.css']
})
export class DetailFacturaComponent {
  factura!: Factura;
  titulo: string = 'FACTURA';


  constructor(private facturaService: FacturaServiceService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: any) => {
      let codFactura = +params.get('codFactura');
      this.facturaService.viewFactura(codFactura).subscribe(factura => {
        this.factura = factura;
      });
    })
  }
}
