import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  institucion:string;
  estado: string;
  edificio: string;
  formularioBuscar: FormGroup;

  constructor(
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buscarFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '01';
    this.edificio = '';
  }

  tenerEdificios(){
    let edificios : Array<any> = new Array<any>();
    this.edificios.forEach(data=>{
      if(data.Estado == '01' && data.Institucion == this.institucion){
        edificios.push(data);
      }
    });
    return edificios;
  }

  asignarEdificio(){
    this.edificio = this.formularioBuscar.value.Edificio;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  filtrarAulas(){
    let cadena = this.formularioBuscar.value.Aula;
    let aulas = new Array<any>();
    if(cadena !== '') {
      this.aulas.forEach(
        (data) => {
          let info = data.Descripcion;
          if(data.Edificio == this.edificio && data.Estado == this.estado && data.Institucion == this.institucion){
            if(info.indexOf(cadena,0)===0){
              aulas.push(data);
            }
          }
        }
      );
    } else {
      this.aulas.forEach(
        (data) => {
          if(data.Estado == this.estado && data.Institucion == this.institucion && data.Edificio == this.edificio){
            aulas.push(data);
          }
        }
      );
    }
    return aulas;
  }

  tenerEstadosAulas(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '06') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Aula: [''],
      Edificio: ['']
    });
  }

}
