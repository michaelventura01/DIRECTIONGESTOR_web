import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailstarea',
  templateUrl: './detailstarea.component.html',
  styleUrls: ['./detailstarea.component.css']
})
export class DetailstareaComponent implements OnInit {
  idTarea: string;
  institucion: string;
  tareas: Array<any> = new Array<any>();
  prioridades: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();

  constructor(
    private tareaServicio: TareaService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.institucion = localStorage.getItem('instituto');
    this.idTarea = this.ruta.snapshot.params['id'];
    this.tareas = this.tareaServicio.verTareas();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.prioridades = this.tareaServicio.verPrioridades()
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

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

}
