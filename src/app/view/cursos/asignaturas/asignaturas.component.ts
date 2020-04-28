import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  asignaturas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  formularioBuscar: FormGroup;
  estado: string;

  constructor(
    private asignaturaServicio: AsignaturaService,
    private estadoServicio: EstadoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.estados = this.estadoServicio.verEstados();
    this.estado = '01';
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  filtrarAsignaturas(){
    let cadena = this.formularioBuscar.value.Asignatura;
    let asignaturas = new Array<any>();

    if(cadena !== '') {

      this.asignaturas.forEach(data => {
        let info = data.Descripcion;
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          if(info.indexOf(cadena,0)===0){
            asignaturas.push(data);
          }
        }
      });

    }else{
      this.asignaturas.forEach(data => {
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          asignaturas.push(data);
        }

      });
    }

    return asignaturas;
  }

  tenerEstadosAsignaturas(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '05') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Asignatura: ['']
    });
  }

}
