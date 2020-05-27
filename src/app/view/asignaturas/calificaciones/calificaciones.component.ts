import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PeriodoService } from 'src/app/services/periodo.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  estados: Array<any> = new Array<any>();
  calificaciones: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  estudiantesCursos: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  asignaturasEmpleadosEstudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  institucion: string;
  formularioBuscar: FormGroup;

  constructor(
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private periodoServicio: PeriodoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.personas = this.personaServicio.verPersonas();
    this.profesores = this.empleadoServicio.verEmpleados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.cursosAsignaturas = this.cursoServicio.verCursosAsignaturas();
    this.estudiantesCursos = this.cursoServicio.verCursosEstudiantes();
    this.asignaturasEmpleados = this.asignaturaServicio.verAsignaturasEmpleados();
    this.asignaturasEmpleadosEstudiantes = this.asignaturaServicio.verAsignaturasEmpleadosEstudiantes();
    this.estados = this.estadoServicio.verEstados();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.periodos = this.periodoServicio.verPeriodos();
    this.calificaciones = this.asignaturaServicio.verCalificaciones();
  }

  tenerPeriodos(){
    let periodos = new Array<any>();
    this.periodos.forEach(periodo => {
      if (periodo.Estado === '01' && periodo.Institucion === this.institucion){
        periodos.push(periodo);
      }
    });
    return periodos;
  }


  tenerAsignaturas() {
    let asignaturas = new Array<any>();
    this.asignaturasEmpleados.forEach(asignaturaencargado =>{
      if(asignaturaencargado.Institucion === this.institucion && asignaturaencargado.Estado === '01'){
        this.cursosAsignaturas.forEach(cursoasignatura => {
          if(cursoasignatura.Institucion === this.institucion && cursoasignatura.Estado === '01'
          && cursoasignatura.id === asignaturaencargado.AsignaturaCurso ){
            this.asignaturas.forEach(asignatura => {
              if(asignatura.id === cursoasignatura.Asignatura && asignatura.Institucion === this.institucion){
                asignaturas.push({
                  id: asignaturaencargado.id,
                  Descripcion: asignatura.Descripcion
                });
              }
            });
          }
        });
      }
    });
    return asignaturas;
  }

  tenerEstados() {
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '13') {
        state.push(dato);
      }
    });
    return state;
  }

  tenerCalificaciones(){
    let calificaciones = new Array<any>();
    let periodo = this.formularioBuscar.value.Periodo;
    let estado = this.formularioBuscar.value.Estado;
    let asignaturaEncargado = this.formularioBuscar.value.Asignatura;
    let Persona = this.formularioBuscar.value.Persona;

    if(asignaturaEncargado === '') {

      this.calificaciones.forEach( calificacion => {
        if (calificacion.Institucion === this.institucion && calificacion.Estado === estado) {
          this.asignaturasEmpleadosEstudiantes.forEach(inscrito => {
            if (inscrito.Institucion === calificacion.Institucion && inscrito.Periodo === periodo && inscrito.Estado === estado) {
              this.asignaturasEmpleados.forEach( asignado => {
                if (asignado.id === inscrito.AsignaturaEncargado && asignado.Institucion === inscrito.Institucion) {
                  this.cursosAsignaturas.forEach(asignacion => {
                    if (asignacion.id === asignado.AsignaturaCurso && asignacion.Institucion === asignado.Institucion){
                      this.estudiantesCursos.forEach(asignar => {
                        if (asignar.Curso === asignacion.Curso && asignar.Institucion === asignacion.Institucion) {
                          this.cursos.forEach(curso => {
                            if (asignar.Curso === curso.id && curso.Institucion === asignar.Institucion) {
                              this.asignaturas.forEach(asignatura => {
                                if (asignatura.id === asignacion.Asignatura && curso.Institucion === asignatura.Institucion) {
                                  this.estudiantes.forEach(estudiante => {
                                    if (estudiante.id === asignar.Estudiante && estudiante.institucion === asignatura.Institucion) {
                                      this.personas.forEach(persona => {
                                        let nombre = persona.Nombre + ' ' + persona.Apellido;
                                        if (estudiante.Persona === persona.id) {
                                          if (nombre.indexOf(Persona, 0)!== -1){
                                            calificaciones.push({
                                              Persona: persona.Nombre + ' ' + persona.Apellido,
                                              Periodo: inscrito.Periodo,
                                              Asignatura: asignatura.Descripcion,
                                              Estado: calificacion.Estado,
                                              id: calificacion.id,
                                              Calificacion: calificacion.Calificacion
                                            });
                                          }
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      this.calificaciones.forEach( calificacion => {
        if (calificacion.Institucion === this.institucion && calificacion.Estado === estado) {
          this.asignaturasEmpleadosEstudiantes.forEach(inscrito => {
            if (inscrito.Institucion === calificacion.Institucion && inscrito.AsignaturaEncargado === asignaturaEncargado
              && inscrito.Periodo === periodo && inscrito.Estado === estado) {
              this.asignaturasEmpleados.forEach( asignado => {
                if (asignado.id === inscrito.AsignaturaEncargado && asignado.Institucion === inscrito.Institucion) {
                  this.cursosAsignaturas.forEach(asignacion => {
                    if (asignacion.id === asignado.AsignaturaCurso && asignacion.Institucion === asignado.Institucion){
                      this.estudiantesCursos.forEach(asignar => {
                        if (asignar.Curso === asignacion.Curso && asignar.Institucion === asignacion.Institucion) {
                          this.cursos.forEach(curso => {
                            if (asignar.Curso === curso.id && curso.Institucion === asignar.Institucion) {
                              this.asignaturas.forEach(asignatura => {
                                if (asignatura.id === asignacion.Asignatura && curso.Institucion === asignatura.Institucion) {
                                  this.estudiantes.forEach(estudiante => {
                                    if (estudiante.id === asignar.Estudiante && estudiante.institucion === asignatura.Institucion) {
                                      this.personas.forEach(persona => {
                                        let nombre = persona.Nombre + ' ' + persona.Apellido;
                                        if (estudiante.Persona === persona.id) {
                                          if (nombre.indexOf(Persona, 0)!== -1){
                                            calificaciones.push({
                                              Persona: persona.Nombre + ' ' + persona.Apellido,
                                              Periodo: inscrito.Periodo,
                                              Asignatura: asignatura.Descripcion,
                                              Estado: calificacion.Estado,
                                              id: calificacion.id,
                                              Calificacion: calificacion.Calificacion
                                            });
                                          }
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }

    return calificaciones;
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Periodo: [''],
      Asignatura: [''],
      Persona: ['']
    });
  }

}
