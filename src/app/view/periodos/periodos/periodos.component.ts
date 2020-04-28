import { Component, OnInit } from '@angular/core';
import { PeriodoService } from 'src/app/services/periodo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
  periodos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  estado: string;
  formularioBuscar: FormGroup;
  institucion: string;

  constructor(
    private periodoServicio: PeriodoService,
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService
    ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.periodos = this.periodoServicio.verPeriodos();
    this.estados = this.estadoServicio.verEstados();
    this.estado = '01';
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }




  filtrarPeriodo(){
    let cadena = this.formularioBuscar.value.Periodo;
    let periodos = new Array<any>();
    if(cadena !== '') {
      this.periodos.forEach(data => {
        let info = data.Descripcion;
        if(data.Institucion == this.institucion && data.Estado == this.estado){
          if(info.indexOf(cadena,0)===0 ){
            periodos.push(data);
          }
        }
      });
    }else{
      this.periodos.forEach(data => {
        if(data.Institucion == this.institucion && data.Estado == this.estado){
          periodos.push(data);
        }
      });
    }

    return periodos;
  }

  tenerSoloEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  tenerEstadosPeriodos(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00') {
        state.push(dato);
      }
    });
    return state;

  }



 buscarFormulario(){
  this.formularioBuscar = this.formBuilder.group({
    Periodo: [''],
    Estado: ['']
  });
}

}
