import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  prioridades: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  formularioBuscar: FormGroup;
  esTiempo: boolean;
  tiempo: Date;
  nombre: string;
  estado: string;
  prioridad: string;
  institucion: string;

  constructor(
    private tareaServicio: TareaService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.prioridades = this.tareaServicio.verPrioridades();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.personas = this.personaServicio.verPersonas();
    this.tareas = this.tareaServicio.verTareas();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '0';
    this.prioridad = '0';
    this.tiempo = new Date();
    this.nombre = '';
  }

  tenerEstados() {
    let states = new Array<any>();
    this.estados.forEach(dato => {
      if(dato.iddominioestado === '00' || dato.iddominioestado === '10'){
        states.push(dato);
      }
    });
    return states;
  }

  cambiarTiempo() {
    this.esTiempo = true;
  }

  asignarEstado() {
    this.estado = this.formularioBuscar.value.Estado;
  }

  asignarPrioridad() {
    this.prioridad = this.formularioBuscar.value.Prioridad;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerFechaActual() {
    return this.personaServicio.obtenerFechaActual().fecha ;
  }

  tenerTiempo() {
    this.tiempo = new Date();
    if (this.formularioBuscar.value.Fecha !== '') {
      this.tiempo = new Date(this.formularioBuscar.value.Fecha);
    }
    let dia: string;

    let mes: string;
    if (this.tiempo.getDate() < 10 ) {
      dia = '0' + this.tiempo.getDate().toString();
    } else {
      dia = this.tiempo.getDate().toString();
    }
    if ((this.tiempo.getMonth() + 1) < 10 ) {
      mes = '0' + (this.tiempo.getMonth() + 1).toString();
    } else {
      mes = (this.tiempo.getMonth() + 1).toString();
    }
    return  {
      mesAno: mes + '-' + this.tiempo.getFullYear(),
      fecha: mes + '/' + dia + '/' + this.tiempo.getFullYear(),
    };
  }

  asignarNombre(event){
    let data = event.target.value.toLowerCase();
    this.nombre = data;
  }

  buscarPersona(codigo) {
    let resultado = {
      Resultado: false,
      Persona: ''
    };
    this.personas.forEach(persona => {
      let nombre = persona.Nombre + ' ' + persona.Apellido;
      if(nombre.indexOf(this.nombre, 0) > -1) {
        this.empleados.forEach(empleado => {
          if (empleado.Persona === persona.id && empleado.Codigo === codigo) {
            resultado = {
              Resultado: true,
              Persona: persona.Nombre + ' ' + persona.Apellido
            };
          }
        });
        this.estudiantes.forEach(estudiante => {
          if (estudiante.Persona === persona.id && estudiante.Codigo === codigo) {
            resultado = {
              Resultado: true,
              Persona: persona.Nombre + ' ' + persona.Apellido
            };
          }
        });
      }
    });
    return resultado;
  }

  tenerTareas() {

    let tareas = new Array<any>();
    this.tareas.forEach(tarea => {
      if (tarea.Institucion === this.institucion) {
        if (this.estado === '0') {
          if (this.prioridad === '0') {
            if (this.tenerTiempo().mesAno === this.tenerFecha(tarea.FechaHora).mesAno
            && this.buscarPersona(tarea.Asignado).Resultado) {

              tareas.push(tarea);
            }
          } else {
            if (this.prioridad === tarea.Prioridad && this.estado === tarea.Estado && this.buscarPersona(tarea.Asignado).Resultado &&
              this.tenerTiempo().mesAno === this.tenerFecha(tarea.FechaHora).mesAno) {
              tareas.push(tarea);
            }
          }
        } else {
          if (this.prioridad === '0') {
            if ( this.estado === tarea.Estado && this.tenerTiempo().mesAno === this.tenerFecha(tarea.FechaHora).mesAno
            && this.buscarPersona(tarea.Asignado).Resultado) {
              tareas.push(tarea);
            }
          } else {
            if (this.prioridad === tarea.Prioridad && this.estado === tarea.Estado && this.buscarPersona(tarea.Asignado).Resultado &&
              this.tenerTiempo().mesAno === this.tenerFecha(tarea.FechaHora).mesAno) {
              tareas.push(tarea);
            }
          }
        }
      }
    });
    return tareas;
  }

   buscarFormulario() {
    this.formularioBuscar = this.formbuilder.group({
      Nombre: [''],
      Prioridad: [''],
      Fecha: [''],
      Estado: ['']
    });
  }
}
