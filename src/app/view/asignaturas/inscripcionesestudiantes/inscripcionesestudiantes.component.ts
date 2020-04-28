import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-inscripcionesestudiantes',
  templateUrl: './inscripcionesestudiantes.component.html',
  styleUrls: ['./inscripcionesestudiantes.component.css']
})
export class InscripcionesestudiantesComponent implements OnInit {

  estados: Array<any> = new Array<any>();
  constructor(
    private estadoServicio: EstadoService
  ) { }

  ngOnInit() {
    this.estados = this.estadoServicio.verEstados();
  }


  tenerEstados() {
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '13') {
        state.push(dato);
      }
    });
    return state;
  }

}
