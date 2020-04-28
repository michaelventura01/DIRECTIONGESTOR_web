import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsestudiantecurso',
  templateUrl: './detailsestudiantecurso.component.html',
  styleUrls: ['./detailsestudiantecurso.component.css']
})
export class DetailsestudiantecursoComponent implements OnInit {

  estudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  cursosEstudiantes: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  curso: string;
  periodo: string;
  formularioBuscar: FormGroup;
  idEstudianteCurso: string;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteServicio: EstudianteService,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private periodoServicio: PeriodoService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.cursos = this.cursoServicio.verCursos();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.periodos = this.periodoServicio.verPeriodos();
    this.cursosEstudiantes = this.cursoServicio.verCursosEstudiantes();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.idEstudianteCurso = this.ruta.snapshot.params['id'];
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }



}
