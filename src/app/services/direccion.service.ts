import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();


  constructor(private database: AngularFirestore) { }

  verCiudades(idpais: string) {
    this.ciudades = new Array<any>();
    this.database.collection('ciudades').get().subscribe((resultado) => {
      resultado.forEach((valor) => {
        if (idpais === valor.data().idpais){
          this.ciudades.push({
            id: valor.id,
            descripcion: valor.data().descripcion
          });
        }
      });
    });
    return this.ciudades;
  }

  verCiudadesAll() {
    this.ciudades = new Array<any>();
    this.database.collection('ciudades').get().subscribe((resultado) => {
      resultado.forEach((valor) => {
        this.ciudades.push({
          id: valor.id,
          descripcion: valor.data().descripcion
        });
      });
    });
    return this.ciudades;
  }

  verPaises() {
    this.paises = new Array<any>();
    this.database.collection('paises').get().subscribe((resultado) => {
      resultado.forEach((valor) => {
        this.paises.push({
          id: valor.id,
          descripcion: valor.data().descripcion,
          nacionalidad: valor.data().nacionalidad
        });
      });
    });
    return this.paises;
  }
}
