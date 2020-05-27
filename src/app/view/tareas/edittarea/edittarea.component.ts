
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TareaService } from 'src/app/services/tarea.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-edittarea',
  templateUrl: './edittarea.component.html',
  styleUrls: ['./edittarea.component.css']
})
export class EdittareaComponent implements OnInit {
  tareas: Array<any> = new Array<any>();
  prioridades: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  institucion: string;
  persona: string;
  formularioCreado: FormGroup;
  esEstado: boolean;
  esFechahora: boolean;
  esPrioridad: boolean;
  idTarea: string;

  constructor(
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private tareaServicio: TareaService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router,
    private ruta: ActivatedRoute,
    private estadoServicio: EstadoService
    ) { }

  ngOnInit() {
    this.crearFormulario();
    this.prioridades = this.tareaServicio.verPrioridades();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.personas = this.personaServicio.verPersonas();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.tareas = this.tareaServicio.verTareas();
    this.estados = this.estadoServicio.verEstados();
    this.institucion = localStorage.getItem('instituto');
    this.idTarea = this.ruta.snapshot.params['id'];
    this.esEstado = false;
    this.esPrioridad = false;
    this.esFechahora = false;

  }

  asignarPersona() {
    this.persona = this.formularioCreado.value.buscarPersona;
    console.log(this.persona);
  }

  cambiarFechaHora() {
    this.esFechahora = true;
  }
  cambiarPrioridad() {
    this.esPrioridad = true;
  }
  cambiarEstado() {
    this.esEstado = true;
  }

  editarTarea(tarea) {
    let titulo = this.formularioCreado.value.Titulo;
    if ( titulo === '') {
      titulo = tarea.Titulo;
    }
    let descripcion = this.formularioCreado.value.Descripcion;
    if ( descripcion === '') {
      descripcion = tarea.Descripcion;
    }
    let fechahora = new Date(this.formularioCreado.value.FechaHora);
    if ( this.formularioCreado.value.FechaHora === ''){
      fechahora = this.tenerFecha(tarea.FechaHora).time;
    }
    let prioridad = this.formularioCreado.value.Prioridad;
    if ( prioridad === '') {
      prioridad = tarea.Prioridad;
    }
    let estado = this.formularioCreado.value.Estado;
    if ( estado === '') {
      estado = tarea.Estado;
    }
    let actual = new Date();


    this.database.doc('tareas/' + this.idTarea).update({
      Titulo: titulo,
      Asignado: tarea.Asignado,
      Descripcion: descripcion,
      FechaHora: fechahora,
      FechaHoraCreacion: tarea.FechaHoraCreacion,
      Prioridad: prioridad,
      Estado: estado,
      Institucion: this.institucion,
      FechaHoraEdicion: actual
    }).then(() => {
      this.mensajeServicio.exito('Actualizado','Tarea ha sido actualizada con exito');
      this.router.navigate(['/tareaDetalle', this.idTarea]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/tareaDetalle', this.idTarea]);
    });
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerAsignados(){
    let asignados = new Array<any>();
    this.empleados.forEach(empleado => {
      if (empleado.institucion === this.institucion && empleado.Estado === '01') {
        this.personas.forEach(persona => {
          if (persona.id === empleado.Persona) {
            let nombre = persona.Nombre + ' ' + persona.Apellido;
            if (nombre.indexOf(this.persona, 0 ) > -1 ) {
              asignados.push({
                descripcion: 'EMPLEADO:  ' + persona.Nombre + ' ' + persona.Apellido + '  |  ' + empleado.Codigo,
                codigo: empleado.Codigo
              });
            }
          }
        });
      }
    });

    this.estudiantes.forEach(estudiante => {
      if (estudiante.institucion === this.institucion && estudiante.Estado === '01') {
        this.personas.forEach(persona => {
          if (persona.id === estudiante.Persona) {
            let nombre = persona.Nombre + ' ' + persona.Apellido;
            if (nombre.indexOf(this.persona, 0 ) > -1 ) {
              asignados.push({
                descripcion: 'ESTUDIANTE:  ' + persona.Nombre + ' ' + persona.Apellido + '  |  ' + estudiante.Codigo,
                codigo: estudiante.Codigo
              });
            }
          }
        });
      }
    });

    return asignados;
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

  buscarPersona(codigo) {
    let resultado = {
      Resultado: false,
      Persona: '',
      Rol: ''
    };
    this.personas.forEach(persona => {
      this.empleados.forEach(empleado => {
        if (empleado.Persona === persona.id && empleado.Codigo === codigo) {
          resultado = {
            Resultado: true,
            Persona: persona.Nombre + ' ' + persona.Apellido,
            Rol: 'Empleado'
          };
        }
      });
      this.estudiantes.forEach(estudiante => {
        if (estudiante.Persona === persona.id && estudiante.Codigo === codigo) {
          resultado = {
            Resultado: true,
            Persona: persona.Nombre + ' ' + persona.Apellido,
            Rol: 'Estudiante'
          };
        }
      });
    });
    return resultado;
  }



  crearFormulario() {
    this.formularioCreado = this.formBuilder.group(
    {
      Titulo: [''],
      Persona: [{value: '', disabled: true}],
      Descripcion: [''],
      Prioridad: [''],
      FechaHora : [''],
      Estado : ['']
    });
  }
}
