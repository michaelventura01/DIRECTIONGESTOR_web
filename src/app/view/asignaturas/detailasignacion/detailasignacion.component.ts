import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-detailasignacion',
  templateUrl: './detailasignacion.component.html',
  styleUrls: ['./detailasignacion.component.css']
})
export class DetailasignacionComponent implements OnInit {

  personas: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  asignaturasCursos: Array<any> = new Array<any>();
  puestosTrabajos: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  asignaturasEmpleados: Array<any> = new Array<any>();
  roles: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  asignatura: string;
  profesor: string;
  edificio: string;
  idAsignacion: string;

  constructor(
    private ruta: ActivatedRoute,
    private personaServicio: PersonaService,
    private empleadoServicio: EmpleadoService,
    private asignaturaServicio: AsignaturaService,
    private edificioServicio: EdificioService,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService) { }

  ngOnInit() {
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
    this.roles = this.empleadoServicio.verPuestosTrabajos();
    this.idAsignacion = this.ruta.snapshot.params['id'];

    console.log(this.asignaturasEmpleados);
  }

}
