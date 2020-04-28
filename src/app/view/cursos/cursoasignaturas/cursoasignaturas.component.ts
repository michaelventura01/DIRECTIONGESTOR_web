import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cursoasignaturas',
  templateUrl: './cursoasignaturas.component.html',
  styleUrls: ['./cursoasignaturas.component.css']
})
export class CursoasignaturasComponent implements OnInit {

  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  curso: string;
  formularioBuscar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService
  ) { }

  ngOnInit() {
    this.crearBuscador();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.estados = this.estadoServicio.verEstados();
    this.cursosAsignaturas = this.cursoServicio.verCursosAsignaturas();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '01';
  }

  tenerEstados(){
    let estados = new Array<any>();
    this.estados.forEach(estado => {
      if(estado.iddominioestado === '00' ){
        estados.push(estado);
      }
    });
    return estados;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  tenerCursos(){
    let cursos = new Array<any>();
    this.cursos.forEach(curso => {
      if(curso.Estado === '01' && curso.Institucion === this.institucion){
        cursos.push(curso);
      }
    });
    return cursos;
  }

  asignarCurso(){
    this.curso = this.formularioBuscar.value.Curso;
  }

  filtrarCursosAsignaturas(){
    let cadena = this.formularioBuscar.value.Buscador;
    let cursosasignaturas = new Array<any>();

    if(cadena !== '') {

//

      this.cursos.forEach(data => {
        if ( data.Institucion === this.institucion && data.id === this.curso ) {
          this.cursosAsignaturas.forEach(curso => {
            if ( curso.Estado === this.estado  ) {
              this.asignaturas.forEach(asignatura => {
                let info = asignatura.Descripcion;
                if(asignatura.Estado === this.estado && info.indexOf(cadena, 0) === 0 && curso.Curso === this.curso){
                  cursosasignaturas.push(curso);
                }
              });
            }
          });

        }
      });
    } else {
      this.cursos.forEach(data => {
        if ( data.Institucion === this.institucion && data.id === this.curso) {

          this.cursosAsignaturas.forEach(curso => {
            if ( curso.Estado === this.estado && curso.Curso === this.curso ) {
              cursosasignaturas.push(curso);
            }
          });

        }
      });
    }

    return cursosasignaturas;
  }

  crearBuscador(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Curso: [''],
      Buscador: ['']
    });

  }

}
