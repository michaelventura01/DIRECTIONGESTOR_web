import { Injectable } from '@angular/core';
import { Edificios } from 'src/model/edificios';
import { Instituciones } from 'src/model/instituciones';
import { AngularFirestore } from '@angular/fire/firestore';
import { Aulas } from 'src/model/aulas';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  constructor(private database: AngularFirestore) { }

  verEdificios() {
    let edificios = new Array<Edificios>();
    this.database.collection<Edificios>('edificios').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let edificio = contenido.data() as Edificios;
        edificio.id = contenido.id;
        edificio.ref = contenido.ref;
        edificios.push(edificio);
      });
    });

    return edificios;
  }


  verAulas() {
    let aulas = new Array<Aulas>();
    this.database.collection<Aulas>('aulas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let aula = contenido.data() as Aulas;
        aula.id = contenido.id;
        aula.ref = contenido.ref;
        aulas.push(aula);
      });
    });

    return aulas;
  }
}
