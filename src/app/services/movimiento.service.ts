import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movimientos } from 'src/model/movimientos';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  constructor(private database: AngularFirestore) {
  }

  verTiposMoviemientos() {
    let tiposMovimientos: Array<any> = new Array<any>();
    this.database.collection('tiposmovimientos').valueChanges().subscribe((resultado) => {
      resultado.forEach((valor) => {
        tiposMovimientos.push(valor);
      });
    });
    return tiposMovimientos;
  }

  verMovimientos() {
    let movimeintos: Array<any> = new Array<any>();
    this.database.collection('movimientos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let movimiento = contenido.data();
        movimiento.id = contenido.id;
        movimiento.ref = contenido.ref;
        movimeintos.push(movimiento);
      });
    });
    return movimeintos;
  }
}
