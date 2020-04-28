import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  tipoTelefono: Array<any> = new Array<any>();

  constructor(private database: AngularFirestore) { }

  tipoTelefonos() {
    this.tipoTelefono = new Array<any>();
    this.database.collection('tipostelefonos').valueChanges().subscribe((resultado) => {
      resultado.forEach((valor) => {
        this.tipoTelefono.push(valor);
      });
    });
    return this.tipoTelefono;
  }

  verTipoTelefono(id: string) {
    this.tipoTelefono = new Array<any>();
    this.database.collection('tipostelefonos').get().subscribe((resultado) => {
      resultado.docs.forEach((valor) => {
        if (id === valor.id ) {
          this.tipoTelefono.push(valor.data());
       }
      });
    });
    return this.tipoTelefono;
  }
}



