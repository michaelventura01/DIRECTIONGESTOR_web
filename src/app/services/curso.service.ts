import { Injectable } from '@angular/core';
import { Cursos } from 'src/model/cursos';
import { Instituciones } from 'src/model/instituciones';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(private database: AngularFirestore) { }

  verCursos() {
    let cursos = new Array<Cursos>();
    this.database.collection<Cursos>('cursos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let curso = contenido.data() as Cursos;
        curso.id = contenido.id;
        curso.ref = contenido.ref;
        cursos.push(curso);
      });
    });
    return cursos;
  }

  verCursosAsignaturas() {
    let cursosAsignaturas = new Array<any>();
    this.database.collection('cursosasignaturas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let cursoasignatura = contenido.data();
        cursoasignatura.id = contenido.id;
        cursoasignatura.ref = contenido.ref;
        cursosAsignaturas.push(cursoasignatura);
      });
    });
    return cursosAsignaturas;
  }

  verCursosEstudiantes() {
    let cursosEstudiantes = new Array<any>();
    this.database.collection('estudiantescursos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let cursoasignatura = contenido.data();
        cursoasignatura.id = contenido.id;
        cursoasignatura.ref = contenido.ref;
        cursosEstudiantes.push(cursoasignatura);
      });
    });
    return cursosEstudiantes;
  }

}
