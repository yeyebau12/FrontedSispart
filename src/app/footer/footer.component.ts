import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public autor1:any = {nombre:'Camilo Alejandro', apellido:'Ahumada Gomez'}
  public autor2:any = {nombre:'Yerson Yeremy', apellido:'Bautista Arevalo'}

}
