import { Injectable } from '@angular/core';
import { Estudiantes } from 'src/model/estudiantes';
import { Personas } from 'src/model/personas';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  estudiantes: Array<Estudiantes> = new Array<Estudiantes>();
  estudiante: Estudiantes = new Estudiantes();
  persona: Personas = new Personas();

  constructor(
    private database: AngularFirestore
  ) {
  }

  verEstudiantes() {
    let estudiantes = new Array<Estudiantes>();
    this.database.collection<Estudiantes>('estudiantes').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let estudiante = contenido.data() as Estudiantes;
        estudiante.id = contenido.id;
        estudiante.ref = contenido.ref;
        estudiantes.push(estudiante);
      });
    });
    return estudiantes;
  }


}
