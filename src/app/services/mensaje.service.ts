import { Injectable } from '@angular/core';
import { Mensajes } from 'src/model/mensajes';
import { Personas } from 'src/model/personas';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  mensaje: Mensajes = new Mensajes();
  emisor: Personas = new Personas();
  receptor: Personas = new Personas();

  constructor() {}

  exitoSeguir(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'success'
    }).then(
      accion => {
      location.reload();
    });
  }

  exito(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'success'
    })
  }

  advertencia(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'warning'
    });
  }

  error(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'error'
    });
  }

  info(titulo: string, descripcion: string){
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: 'info'
    });
  }


}
