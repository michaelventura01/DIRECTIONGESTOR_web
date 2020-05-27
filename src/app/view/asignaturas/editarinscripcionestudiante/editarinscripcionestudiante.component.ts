import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService} from 'src/app/services/edificio.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';


@Component({
  selector: 'app-editarinscripcionestudiante',
  templateUrl: './editarinscripcionestudiante.component.html',
  styleUrls: ['./editarinscripcionestudiante.component.css']
})
export class EditarinscripcionestudianteComponent implements OnInit {

  estudiantes: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  formularioEditar: FormGroup;
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  estudiantesCursos: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  asignaturasEmpleadosEstudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  institucion: string;
  idInscripcion: string;
  esEstado: boolean;
  esAula: boolean;

  constructor(
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private periodoServicio: PeriodoService,
    private ruta: ActivatedRoute,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.institucion = localStorage.getItem('instituto');
    this.idInscripcion = this.ruta.snapshot.params['id'];
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
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
    this.esEstado = false;
    this.esAula = false;
    this.editarFormulario();
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  cambiarAula(){
    this.esAula = true;
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

  tenerAulas(data){
    let asignaturaEmpleado = data;
    let aulas = new Array<any>();
    this.asignaturasEmpleados.forEach(asignado=>{
      if(asignado.id === asignaturaEmpleado && asignado.Institucion === this.institucion){
        this.aulas.forEach(aula => {
          if(aula.Estado === '01' && aula.Institucion === asignado.Institucion && aula.Edificio === asignado.Edificio){
            aulas.push(aula);
          }
        });
      }
    });
    return aulas;
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
    let curso = this.formularioEditar.value.Curso;
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
    let periodo: string = this.formularioEditar.value.Periodo;
    let Curso: string = this.formularioEditar.value.Curso;
    let Asignatura: string = this.formularioEditar.value.Asignatura;
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
    let Curso: string = this.formularioEditar.value.Curso;
    let periodo: string = this.formularioEditar.value.Periodo;
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

  tenerEstados() {
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '13') {
        state.push(dato);
      }
    });
    return state;
  }

  buscarInscripcionEstudiante(inscripcion, Aula){
    let inscripcionestudiante: any;
    let aula = Aula;
    let periodo: string = inscripcion.Periodo;
    let estudianteCurso = inscripcion.EstudianteCurso;
    let asignaturaEncargado = inscripcion.AsignaturaProfesor;

    this.asignaturasEmpleadosEstudiantes.forEach(
      inscripcion => {
        if(periodo == inscripcion.Periodo && asignaturaEncargado == inscripcion.AsignaturaEncargado
          && estudianteCurso == inscripcion.EstudianteCurso && aula === inscripcion.Aula){
          inscripcionestudiante = inscripcion;
        }
      }
    );
    return inscripcionestudiante;
  }

  editarInscripcion(inscripcion) {
    let estado = this.formularioEditar.value.Estado;
    if(estado === ''){
      estado = inscripcion.Estado;
    }
    let aula = this.formularioEditar.value.Aula;
    if(aula === ''){
      aula = inscripcion.Aula;
    }

    this.database.doc('asignaturasempleadosestudiantes/'+this.idInscripcion).update({
      AsignaturaEncargado: inscripcion.AsignaturaEncargado,
      Estado: estado,
      EstudianteCurso: inscripcion.EstudianteCurso,
      Institucion: inscripcion.Institucion,
      Periodo: inscripcion.Periodo,
      Aula: aula
    }).then(()=>{
      this.mensajeServicio.exito('Modificado','Estudiante ha sido modificado en la Asignatura con exito');

      if(estado=== '00' || estado=== '01'){
        this.router.navigate(['/inscripciones']);
      }else{
        this.router.navigate(['/calificacionAgregar']);
      }


    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/inscripciones']);

    });;



  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        EstudianteCurso: [{value:'', disabled: true}],
        Periodo: [{value:'', disabled: true}],
        Asignatura: [{value:'', disabled: true}],
        Curso: [{value:'', disabled: true}],
        AsignaturaProfesor: [{value:'', disabled: true}],
        Aula: [''],
        Estado: ['']
      }
    );
  }
}
