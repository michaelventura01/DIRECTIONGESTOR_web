import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { CursoService } from 'src/app/services/curso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailscurso',
  templateUrl: './detailscurso.component.html',
  styleUrls: ['./detailscurso.component.css']
})
export class DetailscursoComponent implements OnInit {

  idCurso: string;
  estados: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();

  constructor(
    private estadoServicio: EstadoService,
    private cursoServicio: CursoService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idCurso = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.cursos = this.cursoServicio.verCursos();

  }

}
