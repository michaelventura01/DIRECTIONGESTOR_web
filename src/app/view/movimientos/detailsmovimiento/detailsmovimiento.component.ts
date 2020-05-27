import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsmovimiento',
  templateUrl: './detailsmovimiento.component.html',
  styleUrls: ['./detailsmovimiento.component.css']
})
export class DetailsmovimientoComponent implements OnInit {

  estados: Array<any> = new Array<any>();
  movimeintos: Array<any> = new Array<any>();
  tipos: Array<any> = new Array<any>();
  institucion: string;
  ingresos: number;
  gastos: number;
  ganancias: number;
  esTiempo: boolean;
  tipo: string;
  tiempo: Date;
  descripcion: string;
  idMoviento: string;

  constructor(
    private movimientoServicio: MovimientoService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.estados = this.estadoServicio.verEstados();
    this.tipos = this.movimientoServicio.verTiposMoviemientos();
    this.movimeintos = this.movimientoServicio.verMovimientos();
    this.institucion = localStorage.getItem('instituto');
    this.idMoviento = this.ruta.snapshot.params['id'];
    this.tiempo = new Date();
    this.esTiempo = false;
    this.ingresos= 0;
    this.gastos= 0;
    this.ganancias= 0;
    this.tipo ='0';
    this.descripcion = '';
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

}
