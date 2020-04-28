import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  estados: Array<any> = new Array<any>();

  constructor(private database: AngularFirestore) { }

  verEstados() {
    let estados: Array<any> = new Array<any>();
    this.database.collection('estados').valueChanges().subscribe((resultado) => {
      resultado.forEach((valor) => {
        estados.push(valor);
      });
    });
    return estados;
  }
}
