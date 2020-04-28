import { Injectable } from '@angular/core';
import { Articulos } from 'src/model/articulos';
import { Instituciones } from 'src/model/instituciones';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(
    private database: AngularFirestore
  ){}

  verArticulos() {
    let articulos = new Array<Articulos>();
    this.database.collection<Articulos>('articulos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let articulo = contenido.data() as Articulos;
        articulo.id = contenido.id;
        articulo.ref = contenido.ref;

        articulos.push(articulo);
      });
    });
    return articulos;
  }


}
