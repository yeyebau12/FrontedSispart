import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioEmpleado } from 'src/app/models/usuario-empleado';
import { AuthService } from 'src/app/service/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  usuarioEmpleados!: UsuarioEmpleado;

  constructor(private authService: AuthService, private router: Router) {
    this.usuarioEmpleados = new UsuarioEmpleado();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      console.log(`Login: Hola ${this.authService.usuarioEmpleado.userName}, ya estas autenticado!`)
      this.router.navigate(['/listarHuespedes']);
    }
  }

  login(): void {
    console.log(this.usuarioEmpleados);
    if (this.usuarioEmpleados.userName == null || this.usuarioEmpleados.contrasena == null) {

      console.error("username o contraseña vacios!");
      return;
    }

    this.authService.login(this.usuarioEmpleados).subscribe(response => {
      console.log(response);
      // let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      //console.log(payload);
      this.authService.guardarUser(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuarioEmpleado = this.authService.usuarioEmpleado;
      
      this.router.navigate(['/listarHuespedes']);
      console.log(`Hola ${usuarioEmpleado.userName}, has iniciado sessión con exito!`)
    },
      err => {
        if (err.status === 400) {

          console.log("Error: Usuario o Contraseña incorrecta")
        }
      });
  }

  onEnterKey(event: KeyboardEvent): void {
    this.login();

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onEnterKey(event);
    }
  }
}