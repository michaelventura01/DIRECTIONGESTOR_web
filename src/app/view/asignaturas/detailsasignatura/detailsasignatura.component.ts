import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-detailsasignatura',
  templateUrl: './detailsasignatura.component.html',
  styleUrls: ['./detailsasignatura.component.css']
})
export class DetailsasignaturaComponent implements OnInit {

  idAsignatura: string;
  estados: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();

  constructor(
    private estadoServicio: EstadoService,
    private asignaturaServicio: AsignaturaService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idAsignatura = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();

  }

}
