
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { CursoService } from 'src/app/services/curso.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-editcalificacion',
  templateUrl: './editcalificacion.component.html',
  styleUrls: ['./editcalificacion.component.css']
})
export class EditcalificacionComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  estudiantesCursos: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  calificados: Array<any> = new Array<any>();
  asignaturasEmpleadosEstudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  institucion: string;
  fecha: string;
  usuario: string;
  idCalificacion: string;
  formularioEditar: FormGroup;
  esEstado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private periodoServicio: PeriodoService,
    private mensajeServicio: MensajeService,
    private router: Router,
    private ruta: ActivatedRoute,
    private database: AngularFirestore
    ) { }

  ngOnInit() {
    this.editarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
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
    this.calificados = this.asignaturaServicio.verCalificaciones();
    this.idCalificacion = this.ruta.snapshot.params['id'];
    let date = new Date();
    this.fecha = date.getMonth().toString()+' / '+date.getDay().toString()+' / '+date.getFullYear().toString();
    this.esEstado = false;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  tenerInscripcion(calificacion){
    let inscripcion: any;

    this.asignaturasEmpleadosEstudiantes.forEach(inscrito => {
      if (inscrito.id === calificacion.AsignaturaEmpleadoEstudiante) {
        inscripcion = inscrito;
      }
    });
    return inscripcion;
  }

  editarCalificacion(calificacion){
    let estado = this.formularioEditar.value.Estado;
    let calification = this.formularioEditar.value.Calificacion;
    let fechaModificacion:Date = new Date();
    let esModificar: boolean = false;

    if(estado === ''){
      estado = calificacion.Estado;
    } else{
      esModificar = true;
    }

    if(calification === ''){
      calification = calificacion.Calificacion;
    } else{
      esModificar = true;
    }



    if (esModificar) {
      this.database.doc('calificaciones/'+this.idCalificacion).update({
        Calificacion: calification,
        FechaCalificacion: this.tenerFecha(calificacion.FechaCalificacion).time,
        FechaModificacion: fechaModificacion,
        AsignaturaEmpleadoEstudiante: calificacion.AsignaturaEmpleadoEstudiante,
        Estado:estado,
        Institucion: this.institucion
      }).then(()=>{
        if(this.tenerInscripcion(calificacion)){
          this.database.doc('asignaturasempleadosestudiantes/'+calificacion.AsignaturaEmpleadoEstudiante).update({
            AsignaturaEncargado: this.tenerInscripcion(calificacion).AsignaturaEncargado,
            Estado: estado,
            EstudianteCurso: this.tenerInscripcion(calificacion).EstudianteCurso,
            Institucion: this.tenerInscripcion(calificacion).Institucion,
            Periodo: this.tenerInscripcion(calificacion).Periodo,
            Aula: this.tenerInscripcion(calificacion).Aula
          });
        }
        this.mensajeServicio.exito('Actualizado','Calificacion de Asignatura de Estudiante ha sido actualizada con exito');
        this.router.navigate(['/calificacionDetalle', this.idCalificacion]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/calificacionDetalle', this.idCalificacion]);
      });

    }else{
      this.router.navigate(['/calificacionDetalle', this.idCalificacion]);
    }
  }

  tenerCalificacion(calification){
    let calificacion: any;

    this.asignaturasEmpleadosEstudiantes.forEach(inscrito => {
      if (inscrito.id === calification.AsignaturaEmpleadoEstudiante) {

        this.periodos.forEach(periodo => {
          if(periodo.id === inscrito.Periodo){

            this.estudiantesCursos.forEach(estudiantecurso => {
              if(estudiantecurso.id === inscrito.EstudianteCurso){

                this.asignaturasEmpleados.forEach(asignaturaencargado => {
                  if(asignaturaencargado.id === inscrito.AsignaturaEncargado){

                    this.cursosAsignaturas.forEach(asignacion => {
                      if (asignacion.id === asignaturaencargado.AsignaturaCurso) {

                         this.cursos.forEach(curso => {
                           if(curso.id === asignacion.Curso){

                            this.estudiantes.forEach(estudiante => {
                              if(estudiantecurso.Estudiante === estudiante.id){

                                this.personas.forEach(personaestudiante => {
                                  if(personaestudiante.id === estudiante.Persona){

                                    this.asignaturas.forEach(asignatura => {
                                      if(asignatura.id === asignacion.Asignatura){

                                        this.profesores.forEach(profesor => {
                                          if(profesor.id === asignaturaencargado.Profesor){

                                            this.personas.forEach(personaprofesor => {
                                              if(personaprofesor.id === profesor.Persona){

                                                calificacion = {
                                                  Periodo: periodo.Descripcion,
                                                  Curso: curso.Descripcion,
                                                  Asignatura: asignatura.Descripcion,
                                                  Profesor: personaprofesor.Nombre + ' ' + personaprofesor.Apellido,
                                                  Estudiante: personaestudiante.Nombre + ' ' + personaestudiante.Apellido,
                                                  EstudianteCurso: personaestudiante.Nombre + ' ' + personaestudiante.Apellido + ' | ' +curso.Descripcion,
                                                  ProfesorAsignatura: personaprofesor.Nombre + ' ' + personaprofesor.Apellido + ' | ' + asignatura.Descripcion
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
        });
      }
    });

    return calificacion;
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


  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Periodo:[{value:'', disabled: true}],
        Fecha:[{value: '', disabled: true}],
        Calificacion:[''],
        EstudianteAsignatura:[{value:'', disabled: true}],
        Curso:[{value:'', disabled: true}],
        AsignaturaProfesor:[{value:'', disabled: true}],
        Asignatura:[{value:'', disabled: true}],
        Estado:['']
      }
    );

  }



}

