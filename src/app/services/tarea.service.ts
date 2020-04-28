import { Injectable } from '@angular/core';
import { Tareas } from 'src/model/tareas';
import { Instituciones } from 'src/model/instituciones';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  tarea: Tareas = new Tareas();
  institucion: Instituciones = new Instituciones();

  constructor() {
    this.tarea.titulo = 'titulo tarea';
    this.tarea.descripcion = 'descripcion de la tarea en cuestion';
    this.tarea.fecha = '02/03/2020';
    this.tarea.hora = '02:50:16';
    this.tarea.id = '01';
    this.tarea.idEstado = '01';
    this.tarea.idInstitucion = this.institucion.id;
    this.tarea.idPrioridad = '01';
  }
}
