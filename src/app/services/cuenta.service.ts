import { Injectable } from '@angular/core';
import { Cuentas } from 'src/model/cuentas';
import { Instituciones } from 'src/model/instituciones';
import { Personas } from 'src/model/personas';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  cuenta: Cuentas = new Cuentas();
  institucion: Instituciones = new Instituciones();
  persona: Personas = new Personas();

  constructor() {
    this.cuenta.fecha = '22/03/2020';
    this.cuenta.id = '01';
    this.cuenta.idEstado = '01';
    this.cuenta.idInstitucion = this.institucion.id;
    this.cuenta.idPersona = this.persona.id;
    this.cuenta.idTipoCuenta = '01';
    this.cuenta.monto = 10.00;
   }
}
