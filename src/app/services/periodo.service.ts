import { Injectable } from '@angular/core';
import { Periodos } from 'src/model/periodos';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  constructor(
    private database: AngularFirestore
  ) {
   }


   verPeriodos() {
    let periodos = new Array<Periodos>();
    this.database.collection<Periodos>('periodos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let persona = contenido.data() as Periodos;
        persona.id = contenido.id;
        persona.ref = contenido.ref;
        periodos.push(persona);
      });
    });
    return periodos;
  }
}
