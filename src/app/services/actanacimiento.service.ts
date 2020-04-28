import { Injectable } from '@angular/core';
import { Actasnacimientoes } from 'src/model/actasnacimientoes';
import { Personas } from 'src/model/personas';

@Injectable({
  providedIn: 'root'
})
export class ActanacimientoService {
  actanacimiento: Actasnacimientoes = new Actasnacimientoes();
  persona: Personas = new Personas();
  fecha: Date = new Date();
  constructor() {

    this.actanacimiento.anio = 1996;
    this.actanacimiento.folio = '546987';
    this.actanacimiento.id = '01';
    this.actanacimiento.libro = '6547';
    this.actanacimiento.numero = 8796;
    this.actanacimiento.idPersona = this.persona.id;
    this.actanacimiento.idArchivo = null;
    this.actanacimiento.idCircunscripcion = '01';
    this.actanacimiento.idEstado = '01';
  }
}
