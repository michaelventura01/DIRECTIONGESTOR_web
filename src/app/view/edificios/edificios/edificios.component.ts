import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  formularioBuscar: FormGroup;
  estado: string;
  instituto: string;

  constructor(
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarEdificio();
    this.estados = this.estadoServicio.verEstados();
    this.edificios = this.edificioServicio.verEdificios();
    this.instituto = localStorage.getItem('instituto');
    this.estado = '01';
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  tenerEstadosEdificios(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '06') {
        state.push(dato);
      }
    });
    return state
  }

  filtrarEdificios(){
    let cadena = this.formularioBuscar.value.Institucion;
    let edificios = new Array<any>();
    if(cadena !== '') {
      this.edificios.forEach(
        (data) => {
          let nombreapellido = data.Nombre;
          if(nombreapellido.indexOf(cadena, 0) !== -1 && data.Estado == this.estado && data.Institucion == this.instituto){
            edificios.push(data);
          }
        }
      );
    } else {
      this.edificios.forEach(
        (data) => {
          if(data.Estado == this.estado && data.Institucion == this.instituto){
            edificios.push(data);
          }
        }
      );

    }
    return edificios;
  }

  buscarEdificio(){
    this.formularioBuscar = this.formBuilder.group(
      {
        Estado: [''],
        Institucion: ['']
      }
    );
  }

}
