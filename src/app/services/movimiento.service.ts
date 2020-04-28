import { Injectable } from '@angular/core';
import { Movimientos } from 'src/model/movimientos';
import { Instituciones } from 'src/model/instituciones';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  movimiento: Movimientos = new Movimientos();
  institucion: Instituciones = new Instituciones();

  constructor() {
    this.movimiento.descripcion = 'descripcion del movimiento';
    this.movimiento.fecha = '12/03/2020';
    this.movimiento.hora = '10:05:10';
    this.movimiento.id = '01';
    this.movimiento.idEstado = '01';
    this.movimiento.idInstitucion = this.institucion.id;
    this.movimiento.idTipoMovimiento = '01';
    this.movimiento.monto = 120.00;
  }
}
