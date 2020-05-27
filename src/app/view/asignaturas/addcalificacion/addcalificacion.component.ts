import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addcalificacion',
  templateUrl: './addcalificacion.component.html',
  styleUrls: ['./addcalificacion.component.css']
})
export class AddcalificacionComponent implements OnInit {
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
  formularioCreado: FormGroup;

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
    private database: AngularFirestore
    ) { }

  ngOnInit() {
    this.crearFormulario();
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
    this.calificados = this.asignaturaServicio.verCalificaciones();
    let date = new Date();
    this.fecha = date.getMonth().toString()+' / '+date.getDay().toString()+' / '+date.getFullYear().toString();
  }

  tenerCursos(){
    let cursos = new Array<any>();
    this.cursos.forEach(curso => {
      if(curso.Estado == '01' && curso.Institucion == this.institucion){
        cursos.push(curso);
      }
    });

    return cursos;
  }

  tenerAsignaturas(){
    let asignaturas = new Array<any>();
    let curso = this.formularioCreado.value.Curso;
    this.cursosAsignaturas.forEach(asignaturacurso => {
      if(asignaturacurso.Estado == '01' && asignaturacurso.Institucion == this.institucion && asignaturacurso.Curso === curso){
        this.asignaturas.forEach(asignatura => {
          if(asignatura.id === asignaturacurso.Asignatura && asignatura.Estado === '01' && asignatura.Institucion === this.institucion){
            asignaturas.push(asignatura);
          }
        });
      }
    });
    return asignaturas;
  }

  tenerAsignaturasEmpleados(){
    let periodo: string = this.formularioCreado.value.Periodo;
    let Curso: string = this.formularioCreado.value.Curso;
    let Asignatura: string = this.formularioCreado.value.Asignatura;
    let AsignaturasEmpleados = new Array<any>();
    this.asignaturasEmpleados.forEach(asignaturaempleado => {
      if(asignaturaempleado.Institucion === this.institucion && asignaturaempleado.Estado == '01'){

      this.cursosAsignaturas.forEach(cursoasignatura=>{
        if(cursoasignatura.id == asignaturaempleado.AsignaturaCurso && cursoasignatura.Asignatura == Asignatura && cursoasignatura.Estado == '01'  && cursoasignatura.Institucion == this.institucion){

          this.profesores.forEach(profesor => {
            if(profesor.id === asignaturaempleado.Profesor && profesor.institucion == this.institucion){

              this.personas.forEach(persona => {
                if(profesor.Persona == persona.id){

                    this.asignaturas.forEach(asignatura => {
                      if(asignatura.id === cursoasignatura.Asignatura && Asignatura == asignatura.id  && asignatura.Institucion == this.institucion){

                        this.cursos.forEach(curso=>{
                          if(curso.id === cursoasignatura.Curso && curso.id === Curso){

                            AsignaturasEmpleados.push({
                              CodigoProfesor: profesor.Codigo,
                              Profesor: persona.Nombre+' '+persona.Apellido,
                              Asignatura: asignatura.Descripcion,
                              CodigoAsignatura: asignatura.Codigo,
                              Curso: curso.Descripcion,
                              CodigoCurso: curso.Codigo,
                              id: asignaturaempleado.id
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
    return AsignaturasEmpleados;
  }

  buscarCalificacion(){
    let estudianteAsignatura = this.formularioCreado.value.EstudianteAsignatura;
    let calificado: any;
    this.calificados.forEach(calificacion => {
      if(calificacion.Institucion === this.institucion && calificacion.AsignaturaEmpleadoEstudiante === estudianteAsignatura){
        calificado = calificacion;
      }
    });

    return calificado;
  }

  agregarCalificacion(){

    let calificacion = this.formularioCreado.value.Calificacion;
    let fecha = new Date();
    let estudianteAsignatura = this.formularioCreado.value.EstudianteAsignatura;
    let estado = this.formularioCreado.value.Estado;
    let inscrito: any = this.tenerInscripcion();

    if(!this.buscarCalificacion()){

      this.database.collection('calificaciones').add({
        Calificacion: calificacion,
        FechaCalificacion: fecha,
        AsignaturaEmpleadoEstudiante: estudianteAsignatura,
        Estado:estado,
        Institucion: this.institucion
      }).then(()=>{

      if(inscrito){
        this.database.doc('asignaturasempleadosestudiantes/'+estudianteAsignatura).update({
          AsignaturaEncargado: inscrito.AsignaturaEncargado,
          Estado: estado,
          EstudianteCurso: inscrito.EstudianteCurso,
          Institucion: inscrito.Institucion,
          Periodo: inscrito.Periodo,
          Aula: inscrito.Aula
        });
      }
      this.mensajeServicio.exito('Guardado','Calificacion de Asignatura ha sido guardada con exito');
      this.router.navigate(['/calificaciones']);

    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/calificaciones']);

    });
    }else{
      this.mensajeServicio.info('Registro Repitente','Calificacion de Asignatura ha sido guardada Anteriormente');
      this.router.navigate(['/calificaciones']);
    }
  }

  tenerInscripcion(){
    let inscripcion: any;
    let periodo = this.formularioCreado.value.Periodo;
    let asignaturaEncargado = this.formularioCreado.value.AsignaturaProfesor;
    let Curso = this.formularioCreado.value.Curso;

    this.asignaturasEmpleadosEstudiantes.forEach(inscrito => {
      if (inscrito.Institucion === this.institucion && inscrito.Periodo === periodo && inscrito.Estado === '01' &&
      inscrito.AsignaturaEncargado === asignaturaEncargado) {
        this.estudiantesCursos.forEach(asignar => {
          if (asignar.Curso === Curso && asignar.Institucion === inscrito.Institucion) {
            this.cursos.forEach(curso => {
              if(asignar.Curso === curso.id && asignar.Institucion === curso.Institucion){
                this.estudiantes.forEach(estudiante => {
                  if(estudiante.id === asignar.Estudiante && estudiante.institucion === curso.Institucion){
                    this.personas.forEach(persona => {
                      if(persona.id === estudiante.Persona){
                        inscripcion = inscrito;
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

    return inscripcion;
  }




  tenerInscripciones(){
    let inscripciones: Array<any> = new Array<any>();
    let periodo = this.formularioCreado.value.Periodo;
    let asignaturaEncargado = this.formularioCreado.value.AsignaturaProfesor;
    let Curso = this.formularioCreado.value.Curso;

    this.asignaturasEmpleadosEstudiantes.forEach(inscrito => {
      if (inscrito.Institucion === this.institucion && inscrito.Periodo === periodo && inscrito.AsignaturaEncargado === asignaturaEncargado) {
        this.estudiantesCursos.forEach(asignar => {
          if (asignar.Curso === Curso && asignar.Institucion === inscrito.Institucion) {
            this.cursos.forEach(curso => {
              if(asignar.Curso === curso.id && asignar.Institucion === curso.Institucion){
                this.estudiantes.forEach(estudiante => {
                  if(estudiante.id === asignar.Estudiante && estudiante.institucion === curso.Institucion){
                    this.personas.forEach(persona => {
                      if(persona.id === estudiante.Persona){
                        inscripciones.push({
                          Estudiante: persona.Nombre + ' ' + persona.Apellido,
                          Periodo: inscrito.Periodo,
                          Estado: inscrito.Estado,
                          Curso: curso.Descripcion,
                          id: inscrito.id
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


    return inscripciones;
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

  tenerEstados() {
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '13') {
        state.push(dato);
      }
    });
    return state;
  }


  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Periodo:['',Validators.compose([Validators.required])],
        Fecha:[{value: '', disabled: true},Validators.compose([Validators.required])],
        Calificacion:['',Validators.compose([Validators.required])],
        EstudianteAsignatura:['',Validators.compose([Validators.required])],
        Curso:['',Validators.compose([Validators.required])],
        AsignaturaProfesor:['',Validators.compose([Validators.required])],
        Asignatura:['',Validators.compose([Validators.required])],
        Estado:['',Validators.compose([Validators.required])]
      }
    );

  }



}
