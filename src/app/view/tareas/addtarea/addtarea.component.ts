import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstadoService } from 'src/app/services/estado.service';
import { TareaService } from 'src/app/services/tarea.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtarea',
  templateUrl: './addtarea.component.html',
  styleUrls: ['./addtarea.component.css']
})
export class AddtareaComponent implements OnInit {
  tareas: Array<any> = new Array<any>();
  prioridades: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  institucion: string;
  persona: string;
  formularioCreado: FormGroup;
  esTitulo: boolean;
  esAsignado: boolean;
  esDescripcion: boolean;
  esFechahora: boolean;
  esPrioridad: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private tareaServicio: TareaService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.crearFormulario();
    this.prioridades = this.tareaServicio.verPrioridades();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.personas = this.personaServicio.verPersonas();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.institucion = localStorage.getItem('instituto');
    this.esTitulo = false;
    this.esAsignado = false;
    this.esDescripcion = false;
    this.esPrioridad = false;
    this.esFechahora = false;
    this.persona = '';

  }

  asignarPersona() {
    this.persona = this.formularioCreado.value.buscarPersona;
    console.log(this.persona);
  }

  agregarTarea(){
    let titulo = this.formularioCreado.value.Titulo;
    let asignado = this.formularioCreado.value.Persona;
    let descripcion = this.formularioCreado.value.Descripcion;
    let fechahora = new Date(this.formularioCreado.value.FechaHora);
    let prioridad = this.formularioCreado.value.Prioridad;
    let actual = new Date();

    if (titulo !== '' && asignado !== '' && descripcion !== '' && prioridad !== '' && this.formularioCreado.value.FechaHora !== '') {
      this.esTitulo = false;
      this.esAsignado = false;
      this.esDescripcion = false;
      this.esPrioridad = false;
      this.esFechahora = false;
      this.database.collection('tareas').add({
        Titulo: titulo,
        Asignado: asignado,
        Descripcion: descripcion,
        FechaHora: fechahora,
        FechaHoraCreacion: actual,
        Prioridad: prioridad,
        Estado: '01',
        Institucion: this.institucion
      }).then(() =>{
        this.mensajeServicio.exito('Guardado','Tarea ha sido agregada con exito');
        this.router.navigate(['/tareas']);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/tareas']);
      });
    } else {
      if (titulo === '') {this.esTitulo = true; } else{ this.esTitulo = false; }
      if (asignado === '') { this.esAsignado = true; } else { this.esAsignado = false; }
      if (descripcion === '' ) { this.esDescripcion = true; } else { this.esDescripcion = false; }
      if (prioridad === '') { this.esPrioridad = true; } else { this.esPrioridad = false; }
      if (this.formularioCreado.value.FechaHora === '') { this.esFechahora = true; } else { this.esFechahora = false; }
    }
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



  crearFormulario() {
    this.formularioCreado = this.formBuilder.group(
    {
      buscarPersona: [''],
      Titulo: ['', Validators.compose([Validators.required])],
      Persona: ['', Validators.compose([Validators.required])],
      Descripcion: ['', Validators.compose([Validators.required])],
      Prioridad: ['', Validators.compose([Validators.required])],
      FechaHora : ['', Validators.compose([Validators.required])]
    });
  }
}
