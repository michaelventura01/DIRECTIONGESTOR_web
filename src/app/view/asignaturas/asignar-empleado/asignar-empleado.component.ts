import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignar-empleado',
  templateUrl: './asignar-empleado.component.html',
  styleUrls: ['./asignar-empleado.component.css']
})
export class AsignarEmpleadoComponent implements OnInit {
  personas: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  asignaturasCursos: Array<any> = new Array<any>();
  puestosTrabajos: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  asignatura: string;
  profesor: string;
  edificio: string;

  formularioCreado: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router,
    private personaServicio: PersonaService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private edificioServicio: EdificioService,
    private cursoServicio: CursoService) { }

  ngOnInit() {
    this.crearFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.profesores = this.empleadoServicio.verEmpleados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.puestosTrabajos = this.empleadoServicio.verPuestosTrabajos();
    this.asignaturasCursos = this.cursoServicio.verCursosAsignaturas();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.asignaturasEmpleados = this.asignaturaServicio.verAsignaturasEmpleados();
  }

  tenerProfesores(){
    let profesores = new Array<any>();
    profesores.push({
      id: '',
      Opcion: ''
    });
    this.profesores.forEach(empleado => {
      if(empleado.institucion == this.institucion && empleado.Estado == '01'){
        this.personas.forEach(persona => {
          if(empleado.Persona === persona.id){
            this.puestosTrabajos.forEach(puesto =>{
              if(empleado.PuestoTrabajo == puesto.id){
                profesores.push({
                  id: empleado.id,
                  Codigo: empleado.Codigo,
                  PuestoTrabajo: puesto.descripcion,
                  Nombre: persona.Nombre,
                  Apellido: persona.Apellido,
                  Opcion: persona.Nombre+' '+persona.Apellido+'  |  '+empleado.Codigo+'  |  '+puesto.descripcion
                });
              }
            });
          }
        });
      }
    });
    return profesores;
  }


  tenerAsignaturaCursos(){
    let asignaturascursos = new Array<any>();
    asignaturascursos.push({
      Opcion:'',
      id: ''
    });
    this.asignaturasCursos.forEach(asignaturacurso => {
      if(asignaturacurso.Institucion === this.institucion && asignaturacurso.Estado == '01'){
        this.cursos.forEach(curso => {
          if(asignaturacurso.Curso === curso.id && curso.Estado == '01'){
            this.asignaturas.forEach(asignatura => {
              if(asignaturacurso.Asignatura === asignatura.id && asignatura.Estado == '01'){
                asignaturascursos.push({
                  Asignatura: asignatura.Descripcion,
                  AsignaturaCodigo: asignatura.Codigo,
                  Curso: curso.Descripcion,
                  CursoCodigo: curso.Codigo,
                  id: asignaturacurso.id,
                  Opcion: asignatura.Codigo+' - '+asignatura.Descripcion+' | '+curso.Descripcion+' - '+curso.Codigo
                });
              }
            });
          }
        });
      }
    });
    return asignaturascursos;
  }


  asignarAsignatura(){
    this.asignatura = this.formularioCreado.value.Asignatura;
  }

  asignarProfesor(){
    this.profesor = this.formularioCreado.value.Profesor;
  }

  tenerEdificios(){
    let edificios = new Array<any>();
    edificios.push({
      id:'',
      Nombre: ''
    });
    this.edificios.forEach(edificio => {
      if(edificio.Institucion == this.institucion && edificio.Estado == '01'){
        edificios.push(edificio);
      }
    });
    return edificios;

  }

  asignarEdificio(){
    this.edificio = this.formularioCreado.value.Edificio;
  }



  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Asignatura:['', Validators.compose([Validators.required])],
        Profesor:['', Validators.compose([Validators.required])],
        Edificio:['', Validators.compose([Validators.required])]
      }
    );

  }

  buscarAsignacion(){
    let asignacion: any;
    this.asignatura = this.formularioCreado.value.Asignatura;
    this.profesor = this.formularioCreado.value.Profesor;
    this.edificio = this.formularioCreado.value.Edificio;
    this.asignaturasEmpleados.forEach( data=>{
      if(data.AsignaturaCurso == this.asignatura && data.Institucion == this.institucion &&
        data.Profesor == this.profesor && data.Edificio === this.edificio){

          asignacion =data
      }
    });
    return asignacion;
  }

  agregarAsignacionEmpleado(anterior){

    this.asignatura = this.formularioCreado.value.Asignatura
    this.profesor = this.formularioCreado.value.Profesor;
    this.edificio = this.formularioCreado.value.Edificio;


    if(!anterior){
      this.database.collection('asignaturasempleados').add({
        AsignaturaCurso: this.asignatura,
        Profesor: this.profesor,
        Edificio: this.edificio,
        Institucion: this.institucion,
        Estado: '01'
      }).then(()=>{
        this.mensajeServicio.exito('Guardado','Asignatura ha sido asignada a Profesor con exito');
        this.router.navigate(['/asignaciones']);

      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/asignaciones']);
      });

    }else{
      this.mensajeServicio.info('Registro Existente','Asignatura ha sido asignada a Profesor anteriormente');
      this.router.navigate(['/asignaciones']);

    }



  }
}
