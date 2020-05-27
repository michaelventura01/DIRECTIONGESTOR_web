import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { ActivatedRoute } from '@angular/router';
import { DireccionService } from 'src/app/services/direccion.service';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-detailsinscripcionestudiante',
  templateUrl: './detailsinscripcionestudiante.component.html',
  styleUrls: ['./detailsinscripcionestudiante.component.css']
})
export class DetailsinscripcionestudianteComponent implements OnInit {

  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
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
  idInscripcion: string;

  constructor(
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private periodoServicio: PeriodoService,
    private ruta: ActivatedRoute
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
  }

}
