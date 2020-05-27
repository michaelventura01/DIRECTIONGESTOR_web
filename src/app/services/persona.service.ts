import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Personas } from 'src/model/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  persona: Personas = new Personas();
  personas: Array<Personas> = new Array<Personas>();
  sexos: Array<any> = new Array<any>();
  idPersona: string;

  constructor(
    private database: AngularFirestore
  ) {
  }

  verSexos() {
    let sexos = new Array<any>();
    this.database.collection('sexos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        sexos.push({
          id: contenido.id,
          descripcion: contenido.data().descripcion
        });
      });
    });
    return sexos;
  }

  verPersonas() {
    let personas = new Array<Personas>();
    this.database.collection<Personas>('personas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let persona = contenido.data() as Personas;
        persona.id = contenido.id;
        persona.ref = contenido.ref;
        personas.push(persona);
      });
    });
    return personas;
  }

  verRelaciones() {
    let relaciones = new Array<any>();
    this.database.collection('relaciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let relacion = contenido.data();
        relacion.id = contenido.id;
        relacion.ref = contenido.ref;
        relaciones.push(relacion);
      });
    });
    return relaciones;
  }

  verTiposRelaciones() {
    let tiposRelaciones = new Array<Personas>();
    this.database.collection<Personas>('tiposrelaciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let tipo = contenido.data() as Personas;
        tipo.id = contenido.id;
        tipo.ref = contenido.ref;
        tiposRelaciones.push(tipo);
      });
    });
    return tiposRelaciones;
  }

  verObservaciones() {
    let observaciones = new Array<any>();
    this.database.collection('observaciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let observacion = contenido.data();
        observacion.id = contenido.id;
        observacion.ref = contenido.ref;
        observaciones.push(observacion);
      });
    });
    return observaciones;
  }

  verPersona(id: string) {
    let personas = new Array<Personas>();
    this.database.collection<Personas>('personas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        if (id === contenido.id){
          let persona = contenido.data() as Personas;
          persona.id = contenido.id;
          persona.ref = contenido.ref;
          personas.push(persona);
        }
      });
    });
    return personas;
  }

  tenerMes(data){
    let mes;

    switch (data) {
      case 1:
        mes = 'enero';
        break;
      case 2:
        mes = 'febrero';
        break;
      case 3:
        mes = 'marzo';
        break;
      case 4:
        mes = 'abril';
        break;
      case 5:
        mes = 'mayo';
        break;
      case 6:
        mes = 'junio';
        break;
      case 7:
        mes = 'julio';
        break;
      case 8:
        mes = 'agosto';
        break;
      case 9:
        mes = 'septiembre';
        break;
      case 10:
        mes = 'octubre';
        break;
      case 11:
        mes = 'noviembre';
        break;
      case 12:
        mes = 'diciembre';
        break;
    }
    return mes;
  }

  obtenerFecha(data){
    let tiempo = new Date(data.seconds * 1000);
    let actual = new Date();
    let mes: string;
    let dia: string;
    let hora: string;
    let minuto: string;

    if (tiempo.getMonth() + 1 < 10 ) {
      mes = '0' + (tiempo.getMonth() + 1).toString();
    } else {
      mes = (tiempo.getMonth() + 1).toString();
    }

    if (tiempo.getDate() < 10 ) {
      dia = '0' + tiempo.getDate().toString();
    } else {
      dia = tiempo.getDate().toString();
    }

    if ( tiempo.getHours() < 10 ) {
      hora = '0' + tiempo.getHours().toString();
    } else {
      hora = tiempo.getHours().toString();
    }

    if ( tiempo.getMinutes() < 10 ) {
      minuto = '0' + tiempo.getMinutes().toString();
    } else {
      minuto = tiempo.getMinutes().toString();
    }

    return {
      fechaNacimiento: this.tenerMes(tiempo.getMonth() + 1) + ' ' + tiempo.getDate() + ', del ' + tiempo.getFullYear(),
      edad: (actual.getFullYear() - tiempo.getFullYear()) + ' años',
      age: (actual.getFullYear() - tiempo.getFullYear()),
      fecha: mes + '/' + dia + '/' + tiempo.getFullYear(),
      tiempo: hora + ' : ' + minuto,
      date: tiempo.getFullYear() + '/' + tiempo.getMonth() + '/' + tiempo.getDate(),
      time: tiempo,
      birthdate: tiempo.getDate() + ' de ' + this.tenerMes(tiempo.getMonth() + 1),
      mesAno: mes + '-' + tiempo.getFullYear()
    };

  }

  obtenerFechaActual() {
    let tiempo = new Date();
    let mes: string;
    let dia: string;
    let hora: string;
    let minuto: string;
    if (tiempo.getMonth() + 1 < 10 ) {
      mes = '0' + (tiempo.getMonth() + 1).toString();
    } else {
      mes = (tiempo.getMonth() + 1).toString();
    }
    if (tiempo.getDate() < 10 ) {
      dia = '0' + tiempo.getDate().toString();
    } else {
      dia = tiempo.getDate().toString();
    }
    if ( tiempo.getHours() < 10 ) {
      hora = '0' + tiempo.getHours().toString();
    } else {
      hora = tiempo.getHours().toString();
    }
    if ( tiempo.getMinutes() < 10 ) {
      minuto = '0' + tiempo.getMinutes().toString();
    } else {
      minuto = tiempo.getMinutes().toString();
    }
    return {
      fechaNacimiento: this.tenerMes(tiempo.getMonth() + 1) + ' ' + tiempo.getDate() + ', del ' + tiempo.getFullYear(),
      fecha: mes + '/' + dia + '/' + tiempo.getFullYear(),
      tiempo: hora + ' : ' + minuto,
      date: tiempo.getFullYear() + '/' + tiempo.getMonth() + '/' + tiempo.getDate(),
      time: tiempo,
      birthdate: tiempo.getDate() + ' de ' + this.tenerMes(tiempo.getMonth() + 1),
      mesAno: mes + '-' + tiempo.getFullYear()
    };
  }
}
