import { Injectable } from '@angular/core';
import { Actasnacimientoes } from 'src/model/actasnacimientoes';
import { Personas } from 'src/model/personas';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActanacimientoService {

  constructor(
    private database: AngularFirestore
  ){}

  verCircunscripciones() {
    let circunscripciones = new Array<any>();
    this.database.collection('circunscripciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let circunscripcion = contenido.data();
        circunscripcion.id = contenido.id;
        circunscripcion.ref = contenido.ref;

        circunscripciones.push(circunscripcion);
      });
    });
    return circunscripciones;
  }



  verTiposDocumentos() {
    let tipos = new Array<any>();
    this.database.collection('tiposdocumentos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let tipo = contenido.data();
        tipo.id = contenido.id;
        tipo.ref = contenido.ref;

        tipos.push(tipo);
      });
    });
    return tipos;
  }

  verDocumentos() {
    let documentos = new Array<any>();
    this.database.collection('documentos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let documento = contenido.data();
        documento.id = contenido.id;
        documento.ref = contenido.ref;

        documentos.push(documento);
      });
    });
    return documentos;
  }

  verActasNacimientos() {
    let documentos = new Array<any>();
    this.database.collection('actanacimientos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let documento = contenido.data();
        documento.id = contenido.id;
        documento.ref = contenido.ref;

        documentos.push(documento);
      });
    });
    return documentos;
  }
}
