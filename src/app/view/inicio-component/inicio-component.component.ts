import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.css']
})
export class InicioComponentComponent implements OnInit {

  esLogin: boolean;
  esUsuario: boolean;

  constructor(
    private mensajeServicio: MensajeService,
    private router: Router
    ) { }

  ngOnInit() {

    this.esLogin = false;
    if (localStorage.getItem('usuario')){
      this.esUsuario = true;
    } else {
      this.esUsuario = false;
    }
  }

  salirUsuario(){
    localStorage.clear();
    this.esUsuario = false;
    this.mensajeServicio.exitoSeguir('Session Finalizada', 'Ha Finalizado Su Session');
    this.router.navigate(['/']);

  }


  asignarLogin() {
    if (this.esLogin) {
      this.esLogin = false;
    } else {
      this.esLogin = true;
    }
  }

}
