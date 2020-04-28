import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PeriodoService } from 'src/app/services/periodo.service';


@Component({
  selector: 'app-addestudiantecurso',
  templateUrl: './addestudiantecurso.component.html',
  styleUrls: ['./addestudiantecurso.component.css']
})
export class AddestudiantecursoComponent implements OnInit {
  estudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  cursosEstudiantes: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  estudiante: string;
  curso: string;
  periodo: string;
  formularioCreado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteServicio: EstudianteService,
    private personaServicio: PersonaService,
    private cursoServicio: CursoService,
    private router: Router,
    private mensajeServicio: MensajeService,
    private periodoServicio: PeriodoService,
    private database: AngularFirestore) { }

  ngOnInit() {
    this.crearFormulario();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.personas = this.personaServicio.verPersonas();
    this.cursos = this.cursoServicio.verCursos();
    this.cursosEstudiantes = this.cursoServicio.verCursosEstudiantes();
    this.periodos = this.periodoServicio.verPeriodos();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '01';
  }

  tenerEstudiantes(){
    let estudiantes: Array<any> = new Array<any>();
    this.estudiantes.forEach(estudiante => {
      if(estudiante.Estado == this.estado && estudiante.Institucion == this.institucion ){
        estudiantes.push(estudiante);
      }
    });
    return estudiantes;
  }
  tenerCursos(){
    let cursos: Array<any> = new Array<any>();
    this.cursos.forEach(curso => {
      if(curso.Estado == this.estado && curso.Institucion == this.institucion){
        cursos.push(curso);
      }
    });
    return cursos;
  }

  tenerPeriodos(){
    let periodos: Array<any> = new Array<any>();
    this.periodos.forEach(periodo => {
      if(periodo.Estado == this.estado && periodo.Institucion == this.institucion){
        periodos.push(periodo);
      }
    });
    return periodos;
  }

  guardarEstudianteCurso(estudianteCurso){
    if(!estudianteCurso){
      this.database.collection('estudiantescursos').add({
          Institucion: this.institucion,
          Curso: this.formularioCreado.value.Curso,
          Estudiante: this.formularioCreado.value.Estudiante,
          Estado: this.estado,
          Periodo: this.formularioCreado.value.Periodo
        }).then(()=>{
          this.mensajeServicio.exito('Guardado','Estudiante ha sido agregado a Curso con exito');
          this.router.navigate(['/estudianteCursos']);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/estudianteCursos']);
        });
      }else{
        this.mensajeServicio.info('Registro Existente','Estudiante ha sido registrado a ese Curso anteriormente');
        this.router.navigate(['/estudianteCursos']);
      }

  }

  buscarCursoEstudiante(){
    this.estudiante = this.formularioCreado.value.Estudiante;
    this.curso = this.formularioCreado.value.Curso;
    this.periodo = this.formularioCreado.value.Periodo;
    let cursoestudiante: any;
    this.cursosEstudiantes.forEach( data=>{
      if(data.Curso == this.curso && data.Estudiante == this.estudiante && this.periodo === data.Periodo && this.institucion === data.Institucion){
        cursoestudiante =data
      }
    });
    return cursoestudiante;
  }

  filtrarPersonas(){
    let estudiantes = new Array<any>();
    let cadena = this.formularioCreado.value.buscarEstudiante;
    if(cadena !== '') {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if(nombreapellido.indexOf(cadena, 0) !== -1 ){
            this.estudiantes.forEach(estudiante => {
              if(data.id === estudiante.Persona && estudiante.institucion === this.institucion && estudiante.Estado === this.estado){
                estudiantes.push({
                  id: estudiante.id,
                  Nombre:data.Nombre,
                  Apellido: data.Apellido,
                  Codigo: estudiante.Codigo,
                  Edad: this.tenerFecha(data.FechaNacimiento).edad
                });
              }
            });
          }
        });
    } else {
      this.personas.forEach(
      (data) => {
        this.estudiantes.forEach(estudiante => {
          if(data.id === estudiante.Persona && estudiante.institucion === this.institucion && estudiante.Estado === this.estado){
            estudiantes.push({
              id: estudiante.id,
              Nombre:data.Nombre,
              Apellido: data.Apellido,
              Codigo: estudiante.Codigo,
              Edad: this.tenerFecha(data.FechaNacimiento).edad
            });
          }
        });
      });
    }
    return estudiantes;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        buscarEstudiante: [''],
        Periodo: ['', Validators.compose([Validators.required])],
        Estudiante: ['', Validators.compose([Validators.required])],
        Curso: ['', Validators.compose([Validators.required])]
      }
    );
  }


}
