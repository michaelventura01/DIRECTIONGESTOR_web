import { Injectable } from '@angular/core';
import { Asignaturas } from 'src/model/asignaturas';
import { Instituciones } from 'src/model/instituciones';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor(private database: AngularFirestore) { }

  verAsignaturas() {
    let asignaturas = new Array<Asignaturas>();
    this.database.collection<Asignaturas>('asignaturas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let asignatura = contenido.data() as Asignaturas;
        asignatura.id = contenido.id;
        asignatura.ref = contenido.ref;
        asignaturas.push(asignatura);
      });
    });

    return asignaturas;
  }

  verAsignaturasEmpleados() {
    let asignaturas = new Array<any>();
    this.database.collection('asignaturasempleados').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let asignatura = contenido.data();
        asignatura.id = contenido.id;
        asignatura.ref = contenido.ref;
        asignaturas.push(asignatura);
      });
    });

    return asignaturas;
  }

  verAsignaturasEmpleadosEstudiantes(){
    let asignaturas = new Array<any>();
    this.database.collection('asignaturasempleadosestudiantes').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let asignatura = contenido.data();
        asignatura.id = contenido.id;
        asignatura.ref = contenido.ref;
        asignaturas.push(asignatura);
      });
    });

    return asignaturas;
  }

  verCalificaciones() {
    let calificaciones = new Array<any>();
    this.database.collection('calificaciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let calificacion = contenido.data();
        calificacion.id = contenido.id;
        calificacion.ref = contenido.ref;
        calificaciones.push(calificacion);
      });
    });

    return calificaciones;
  }


}
