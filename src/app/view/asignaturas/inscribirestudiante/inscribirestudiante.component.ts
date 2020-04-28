import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-inscribirestudiante',
  templateUrl: './inscribirestudiante.component.html',
  styleUrls: ['./inscribirestudiante.component.css']
})
export class InscribirestudianteComponent implements OnInit {
  estudiantes: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  estudiantesCursos: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  asignaturasEmpleadosEstudiantes: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  institucion: string;
  formularioCreado: FormGroup;

  constructor(
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private periodoServicio: PeriodoService,
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private router: Router,
    private mensajeServicio: MensajeService
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
  }

  tenerPeriodos(){
    let periodos = new Array<any>();
    this.periodos.forEach(periodo => {
      if(periodo.Estado == '01' && periodo.Institucion == this.institucion){
        periodos.push(periodo);
      }
    });

    return periodos;
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

  tenerCursosEstudiantes(){
    let Curso: string = this.formularioCreado.value.Curso;
    let periodo: string = this.formularioCreado.value.Periodo;
    let cursosEstudiantes = new Array<any>();
    this.estudiantesCursos.forEach(estudiantecurso => {
      if(estudiantecurso.Curso === Curso &&  estudiantecurso.Institucion === this.institucion && estudiantecurso.Estado === '01' && periodo === estudiantecurso.Periodo){
        this.cursos.forEach(curso => {
          if(curso.id === estudiantecurso.Curso && curso.Estado === '01' && curso.id === Curso){
            this.estudiantes.forEach(estudiante => {
              if(estudiante.id === estudiantecurso.Estudiante && estudiante.Estado === '01'){
                this.personas.forEach(persona => {
                  if(persona.id === estudiante.Persona){
                    cursosEstudiantes.push({
                      Curso: curso.Descripcion,
                      CodigoCurso: curso.Codigo,
                      Estudiante: persona.Nombre+' '+persona.Apellido,
                      CodigoEstudiante: estudiante.Codigo,
                      id: estudiantecurso.id
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    return cursosEstudiantes;
  }

  buscarInscripcionEstudiante(){
    let inscripcionestudiante: any;
    let periodo: string = this.formularioCreado.value.Periodo;
    let estudianteCurso = this.formularioCreado.value.EstudianteCurso;
    let asignaturaEncargado = this.formularioCreado.value.AsignaturaProfesor;

    this.asignaturasEmpleadosEstudiantes.forEach(
      inscripcion => {
        if(periodo == inscripcion.Periodo && asignaturaEncargado == inscripcion.AsignaturaEncargado && estudianteCurso == inscripcion.EstudianteCurso){
          inscripcionestudiante = inscripcion;
        }
      }
    );
    return inscripcionestudiante;
  }
  agregarInscripcionEstudiante(inscripcionEstudiante){
    let periodo = this.formularioCreado.value.Periodo;
    let estudianteCurso = this.formularioCreado.value.EstudianteCurso;
    let asignaturaEncargado = this.formularioCreado.value.AsignaturaProfesor;
    if(!inscripcionEstudiante){

      this.database.collection('asignaturasempleadosestudiantes').add({
        AsignaturaEncargado: asignaturaEncargado,
        Estado: '01',
        EstudianteCurso: estudianteCurso,
        Institucion: this.institucion,
        Periodo: periodo
      }).then(()=>{
      this.mensajeServicio.exito('Guardado','Estudiante ha sido inscrito a la Asignatura con exito');
      this.router.navigate(['/inscripciones']);

    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/inscripciones']);

    });
    }else{
      this.mensajeServicio.info('Registro','Estudiante ha sido inscrito a la Asignatura Anteriormente');
      this.router.navigate(['/inscripciones']);
    }
  }


  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        EstudianteCurso: ['', Validators.compose([Validators.required])],
        Periodo: ['', Validators.compose([Validators.required])],
        Asignatura: ['', Validators.compose([Validators.required])],
        Curso: ['', Validators.compose([Validators.required])],
        AsignaturaProfesor: ['', Validators.compose([Validators.required])]
      }
    );
  }
}
