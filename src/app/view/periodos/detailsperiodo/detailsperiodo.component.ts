import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeriodoService } from 'src/app/services/periodo.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsperiodo',
  templateUrl: './detailsperiodo.component.html',
  styleUrls: ['./detailsperiodo.component.css']
})
export class DetailsperiodoComponent implements OnInit {

  periodos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioBuscar: FormGroup;
  institucion: string;
  idPeriodo: string;

  constructor(
    private periodoServicio: PeriodoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private ruta: ActivatedRoute
    ) { }

  ngOnInit() {
    this.idPeriodo = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.periodos = this.periodoServicio.verPeriodos();
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerSemanas(fechaInicio, fechaFin){
    let tiempoA: Date;
    let tiempoB: Date;
    let semanaTotal: number = 0;

    if(fechaInicio!== '' && fechaFin!== ''){

      tiempoA = new Date(fechaInicio);
      tiempoB = new Date(fechaFin);
      semanaTotal = Math.round(Math.round( (tiempoB.getTime() - tiempoA.getTime()) / (1000*60*60*24) )/7);

    }

    return semanaTotal;
  }


}
