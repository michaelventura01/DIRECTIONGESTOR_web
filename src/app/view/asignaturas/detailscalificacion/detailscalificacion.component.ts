import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-detailscalificacion',
  templateUrl: './detailscalificacion.component.html',
  styleUrls: ['./detailscalificacion.component.css']
})
export class DetailscalificacionComponent implements OnInit {
  idCalificacion: string;
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  calificaciones: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  estudiantesCursos: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  asignaturasEmpleadosEstudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  institucion: string;

  constructor(
    private ruta: ActivatedRoute,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private periodoServicio: PeriodoService

  ) { }

  ngOnInit() {
    this.institucion = localStorage.getItem('instituto');
    this.personas = this.personaServicio.verPersonas();
    this.profesores = this.empleadoServicio.verEmpleados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.calificaciones = this.asignaturaServicio.verCalificaciones();
    this.cursosAsignaturas = this.cursoServicio.verCursosAsignaturas();
    this.estudiantesCursos = this.cursoServicio.verCursosEstudiantes();
    this.asignaturasEmpleados = this.asignaturaServicio.verAsignaturasEmpleados();
    this.asignaturasEmpleadosEstudiantes = this.asignaturaServicio.verAsignaturasEmpleadosEstudiantes();
    console.log(this.asignaturasEmpleadosEstudiantes);
    this.estados = this.estadoServicio.verEstados();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.periodos = this.periodoServicio.verPeriodos();
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
    this.idCalificacion = this.ruta.snapshot.params['id'];
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }


}
