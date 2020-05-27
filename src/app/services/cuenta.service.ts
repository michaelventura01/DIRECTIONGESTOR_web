import { Injectable } from '@angular/core';
import { Cuentas } from 'src/model/cuentas';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(
    private database: AngularFirestore
  ) {}

  verCuentas() {
    let cuentas = new Array<Cuentas>();
    this.database.collection<Cuentas>('cuentas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let cuenta = contenido.data() as Cuentas;
        cuenta.id = contenido.id;
        cuenta.ref = contenido.ref;
        cuentas.push(cuenta);
      });
    });
    return cuentas;
  }

  verTipoCuentas() {
    let tipocuentas = new Array<any>();
    this.database.collection('tiposcuentas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let tipo = contenido.data();
        tipo.id = contenido.id;
        tipo.ref = contenido.ref;
        tipocuentas.push(tipo);
      });
    });
    return tipocuentas;
  }


}
