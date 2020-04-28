import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {
  formularioBuscar: FormGroup;
  personas: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  asignaturasCursos: Array<any> = new Array<any>();
  puestosTrabajos: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  asignatura: string;
  profesor: string;
  edificio: string;
  estado: string;

  constructor(
    private ruta: ActivatedRoute,
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private edificioServicio: EdificioService,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService) { }

  ngOnInit() {
    this.buscarFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.profesores = this.empleadoServicio.verEmpleados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.puestosTrabajos = this.empleadoServicio.verPuestosTrabajos();
    this.asignaturasCursos = this.cursoServicio.verCursosAsignaturas();
    this.estados = this.estadoServicio.verEstados();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.asignaturasEmpleados = this.asignaturaServicio.verAsignaturasEmpleados();
    this.estado = '01';

  }



  tenerAsignaturas(){
    let asignaturas = new Array<any>();
    this.asignaturas.forEach(asignatura => {
      if(asignatura.Institucion === this.institucion){
        asignaturas.push(asignatura);
      }
    });
    return asignaturas;
  }

  tenerProfesores(){
    let profesores = new Array<any>();
    this.profesores.forEach(empleado => {
      if(empleado.institucion == this.institucion){
        this.personas.forEach(persona => {
          if(empleado.Persona === persona.id){
            this.puestosTrabajos.forEach(puesto =>{
              if(empleado.PuestoTrabajo == puesto.id){
                profesores.push({
                  id: empleado.id,
                  Codigo: empleado.Codigo,
                  PuestoTrabajo: puesto.descripcion,
                  Nombre: persona.Nombre,
                  Apellido: persona.Apellido
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
    this.asignaturasCursos.forEach(asignaturacurso => {
      if(asignaturacurso.Institucion === this.institucion){
        this.cursos.forEach(curso => {
          if(asignaturacurso.Curso === curso.id){
            this.asignaturas.forEach(asignatura => {
              if(asignaturacurso.Asignatura === asignatura.id){
                asignaturascursos.push({
                  Asignatura: asignatura.Descripcion,
                  AsignaturaCodigo: asignatura.Codigo,
                  Curso: curso.Descripcion,
                  CursoCodigo: curso.Codigo,
                  id: asignaturacurso.id,
                });
              }
            });
          }
        });
      }
    });
    return asignaturascursos;
  }

  filtrarAsignaciones(){

    let asignaciones = new Array<any>();
    let persona = this.formularioBuscar.value.Persona;

    if(persona !== '') {

      this.asignaturasEmpleados.forEach(asignaturaempleado => {
        if(asignaturaempleado.Institucion == this.institucion && asignaturaempleado.Estado == this.estado){
          this.asignaturasCursos.forEach( asignaturacurso => {
            if(asignaturaempleado.AsignaturaCurso == asignaturacurso.id && asignaturacurso.Asignatura == this.asignatura){
              this.tenerProfesores().forEach(profesor=>{
                let nombreapellido = profesor.Nombre+' '+profesor.Apellido;
                if(profesor.id === asignaturaempleado.Profesor){
                  if(nombreapellido.indexOf(persona,0)=== 0){
                    this.asignaturas.forEach(asignatura=>{
                      if(asignatura.id === asignaturacurso.Asignatura){
                        asignaciones.push({
                          Estado: asignaturaempleado.Estado,
                          Asignatura: asignatura.Descripcion,
                          CodigoAsignatura: asignatura.Codigo,
                          Nombre: profesor.Nombre,
                          Apellido: profesor.Apellido,
                          Codigo: profesor.Codigo,
                          PuestoTrabajo: profesor.PuestoTrabajo,
                          id: asignaturaempleado.id
                        });
                      }
                    });
                   }
                }
              });
            }
          });
        }
      });

    } else {

      this.asignaturasEmpleados.forEach(asignaturaempleado => {
        if(asignaturaempleado.Institucion == this.institucion && asignaturaempleado.Estado == this.estado){
          this.asignaturasCursos.forEach( asignaturacurso => {
            if(asignaturaempleado.AsignaturaCurso == asignaturacurso.id && asignaturacurso.Asignatura == this.asignatura){
              this.tenerProfesores().forEach(profesor=>{
                let nombreapellido = profesor.Nombre+' '+profesor.Apellido;
                if(profesor.id === asignaturaempleado.Profesor){
                  this.asignaturas.forEach(asignatura=>{
                    if(asignatura.id === asignaturacurso.Asignatura){
                      asignaciones.push({
                        Estado: asignaturaempleado.Estado,
                        Asignatura: asignatura.Descripcion,
                        CodigoAsignatura: asignatura.Codigo,
                        Nombre: profesor.Nombre,
                        Apellido: profesor.Apellido,
                        Codigo: profesor.Codigo,
                        PuestoTrabajo: profesor.PuestoTrabajo,
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
    return asignaciones;
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
    this.estado = this.formularioBuscar.value.Estado;
    console.log(this.estado);
  }

  asignarAsignatura(){
    this.asignatura = this.formularioBuscar.value.Asignatura;
  }

  tenerEdificios(){
    let edificios = new Array<any>();
    this.edificios.forEach(edificio => {
      if(edificio.Institucion == this.institucion){
        edificios.push(edificio);
      }
    });
    return edificios;
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Asignatura: [''],
      Persona: ['']
    });

  }


}
