import { Injectable } from '@angular/core';
import { Empleados } from 'src/model/empleados';
import { Personas } from 'src/model/personas';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  empleados: Array<Empleados> = new Array<Empleados>();
  puestosTrabajos: Array<any> = new Array<any>();
  persona: Personas = new Personas();

  constructor(
    private database: AngularFirestore
  ) {
  }

  verEmpleados() {
    let empleados = new Array<Empleados>();
    this.database.collection<Empleados>('empleados').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let empleado = contenido.data() as Empleados;
        empleado.id = contenido.id;
        empleado.ref = contenido.ref;
        empleados.push(empleado);
      });
    });
    return empleados;
  }

  verEmpleado(id: string) {
    let empleados = new Array<Empleados>();
    this.database.collection<Empleados>('empleados').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        if (id === contenido.id){
          let empleado = contenido.data() as Empleados;
          empleado.id = contenido.id;
          empleado.ref = contenido.ref;
          empleados.push(empleado);
        }
      });
    });

    return empleados;
  }

  verPuestosTrabajos() {
    let puestosTrabajos = new Array<any>();
    this.database.collection('puestostrabajos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        puestosTrabajos.push({
          id: contenido.id,
          descripcion: contenido.data().descripcion
        });
      });
    });
    return puestosTrabajos;
  }
}
