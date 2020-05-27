import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(private database: AngularFirestore) { }

  verCiudades(idpais: string) {
    let ciudades = new Array<any>();
    this.database.collection('ciudades').get().subscribe((resultado) => {
      resultado.forEach((valor) => {
        if (idpais === valor.data().idpais){
          ciudades.push({
            id: valor.id,
            descripcion: valor.data().descripcion
          });
        }
      });
    });
    return ciudades;
  }

  verCiudadesAll() {
    let ciudades = new Array<any>();
    this.database.collection('ciudades').get().subscribe((resultado) => {
      resultado.forEach((valor) => {
        ciudades.push({
          id: valor.id,
          descripcion: valor.data().descripcion
        });
      });
    });
    return ciudades;
  }

  verPaises() {
    let paises = new Array<any>();
    this.database.collection('paises').get().subscribe((resultado) => {
      resultado.forEach((valor) => {
        paises.push({
          id: valor.id,
          descripcion: valor.data().descripcion,
          nacionalidad: valor.data().nacionalidad
        });
      });
    });
    return paises;
  }
}
