import { Injectable } from '@angular/core';
import { Tareas } from 'src/model/tareas';
import { Instituciones } from 'src/model/instituciones';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private database: AngularFirestore) { }

  verTareas() {
    let tareas = new Array<Tareas>();
    this.database.collection<Tareas>('tareas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let tarea = contenido.data() as Tareas;
        tarea.id = contenido.id;
        tarea.ref = contenido.ref;
        tareas.push(tarea);
      });
    });
    return tareas;
  }

  verPrioridades() {
    let prioridades = new Array<any>();
    this.database.collection('prioridades').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let prioridad = contenido.data();
        prioridad.id = contenido.id;
        prioridad.ref = contenido.ref;
        prioridades.push(prioridad);
      });
    });
    return prioridades;
  }
}
