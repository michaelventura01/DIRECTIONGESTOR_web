import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';


@Component({
  selector: 'app-editasignar-empleado',
  templateUrl: './editasignar-empleado.component.html',
  styleUrls: ['./editasignar-empleado.component.css']
})
export class EditasignarEmpleadoComponent implements OnInit  {

  formularioEditar: FormGroup;
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
  idAsignacion: string;
  estado: string;
  esEstado: boolean;
  esEdificio: boolean;
  esProfesor: boolean;
  estados: Array<any> = new Array<any>();

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router,
    private personaServicio: PersonaService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private ruta: ActivatedRoute,
    private cursoServicio: CursoService) { }

  ngOnInit() {
    this.editarFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.profesores = this.empleadoServicio.verEmpleados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.puestosTrabajos = this.empleadoServicio.verPuestosTrabajos();
    this.asignaturasCursos = this.cursoServicio.verCursosAsignaturas();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.idAsignacion = this.ruta.snapshot.params['id'];
    this.asignaturasEmpleados = this.asignaturaServicio.verAsignaturasEmpleados();
    this.esProfesor = false;
    this.esEstado = false;
    this.esEdificio = false;
    this.estados = this.estadoServicio.verEstados();
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
    this.asignatura = this.formularioEditar.value.Asignatura;
  }

  asignarProfesor(){
    this.profesor = this.formularioEditar.value.Profesor;
  }

  cambiarProfesor(){
    this.esProfesor = true;
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
    this.edificio = this.formularioEditar.value.Edificio;
  }

  cambiarEdificio(){
    this.esEdificio = true;
  }

  tenerEstados(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' ) {
        state.push(dato);
      }
    });
    return state
  }

  asignarEstado(){
    this.estado = this.formularioEditar.value.Estado;
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  editarAsignacion(asignacion){
    this.estado = this.formularioEditar.value.Estado;
    if(this.estado == ''){
      this.estado = asignacion.Estado;
    }
    this.profesor = this.formularioEditar.value.Profesor;
    if(this.profesor == ''){
      this.profesor = asignacion.Profesor;
    }
    this.edificio = this.formularioEditar.value.Edificio;
    if(this.edificio == ''){
      this.edificio = asignacion.Edificio;
    }

    this.database.doc('asignaturasempleados/'+this.idAsignacion).update({
      AsignaturaCurso: asignacion.AsignaturaCurso,
      Edificio: this.edificio,
      Estado: this.estado,
      Institucion: this.institucion,
      Profesor: this.profesor
    }).then(()=>{
      this.mensajeServicio.exito('Actualizado','Asignacion de Asignatura ha sido actualizado con exito');
      this.router.navigate(['/asignacionDetalle', this.idAsignacion]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/asignacionDetalle', this.idAsignacion]);
    });
  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Asignatura:[{value:'', disabled: true}],
        Profesor:[''],
        Edificio:[''],
        Estado:['']
      }
    );
  }
}
