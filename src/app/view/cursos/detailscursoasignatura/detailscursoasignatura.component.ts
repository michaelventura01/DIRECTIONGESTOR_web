import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailscursoasignatura',
  templateUrl: './detailscursoasignatura.component.html',
  styleUrls: ['./detailscursoasignatura.component.css']
})
export class DetailscursoasignaturaComponent implements OnInit {
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  idCursoAsignatura: string;

  constructor(
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private ruta: ActivatedRoute,
    private estadoServicio: EstadoService) { }

  ngOnInit() {
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.estados = this.estadoServicio.verEstados();
    this.cursosAsignaturas = this.cursoServicio.verCursosAsignaturas();
    this.institucion = localStorage.getItem('instituto');
    this.idCursoAsignatura = this.ruta.snapshot.params['id'];
  }

}
