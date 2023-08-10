import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador-empleado',
  templateUrl: './paginador-empleado.component.html',
  styleUrls: ['./paginador-empleado.component.css']
})
export class PaginadorEmpleadoComponent {
    @Input() paginador: any;

  paginas!: number[];
  from!: number;
  until!: number;

  constructor() {

  }


  ngOnInit() {
    this.initPaginador();
  }

  ngOnChanges(changes: SimpleChanges) {

    let updatePaginador = changes['paginador'];
    
    if(updatePaginador.previousValue){
      
      this.initPaginador();
    }

  }


  private initPaginador(): void {

    this.from = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.until = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6)

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.until - this.from + 1).fill(0).map((valor, indice) => indice + this.from);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }

  }

}
