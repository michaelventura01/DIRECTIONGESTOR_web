import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  formularioBuscar: FormGroup;
  estado: string;

  constructor(
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.cursos = this.cursoServicio.verCursos();
    this.estados = this.estadoServicio.verEstados();
    this.estado = '01';

    console.log(this.filtrarCursos());
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  filtrarCursos(){
    let cadena = this.formularioBuscar.value.Curso;
    let cursos = new Array<any>();

    if(cadena !== '') {

      this.cursos.forEach(data => {
        let info = data.Descripcion;
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          if(info.indexOf(cadena,0)===0){
            cursos.push(data);
          }
        }
      });

    }else{
      this.cursos.forEach(data => {
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          cursos.push(data);
        }

      });
    }

    return cursos;
  }

  tenerEstadosCursos(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '07') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Curso: ['']
    });
  }

}
