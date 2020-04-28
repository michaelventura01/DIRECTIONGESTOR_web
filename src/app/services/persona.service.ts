import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { EstadoService } from 'src/app/services/estado.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { FormGroup } from '@angular/forms';
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
    this.sexos = new Array<any>();
    this.database.collection('sexos').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        this.sexos.push({
          id: contenido.id,
          descripcion: contenido.data().descripcion
        });
      });
    });
    return this.sexos;
  }

  verPersonas() {
    this.personas = new Array<Personas>();
    this.database.collection<Personas>('personas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let persona = contenido.data() as Personas;
        persona.id = contenido.id;
        persona.ref = contenido.ref;
        this.personas.push(persona);
      });
    });
    return this.personas;
  }

  verPersona(id: string) {
    this.personas = new Array<Personas>();
    this.database.collection<Personas>('personas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        if (id === contenido.id){
          let persona = contenido.data() as Personas;
          persona.id = contenido.id;
          persona.ref = contenido.ref;
          this.personas.push(persona);
        }
      });
    });
    return this.personas;
  }

  tenerMes(data){
    let mes;

    switch(data){
      case 1:
        mes = 'enero'
        break;
      case 2:
        mes = 'febrero'
        break;
      case 3:
        mes = 'marzo'
        break;
      case 4:
        mes = 'abril'
        break;
      case 5:
        mes = 'mayo'
        break;
      case 6:
        mes = 'junio'
        break;
      case 7:
        mes = 'julio'
        break;
      case 8:
        mes = 'agosto'
        break;
      case 9:
        mes = 'septiembre'
        break;
      case 10:
        mes = 'octubre'
        break;
      case 11:
        mes = 'noviembre'
        break;
      case 12:
        mes = 'diciembre'
        break;
    }
    return mes;
  }

  obtenerFecha(data){
    let tiempo = new Date(data.seconds * 1000);
    let actual = new Date();

    return {
      fechaNacimiento: this.tenerMes(tiempo.getMonth()) + ' ' + tiempo.getDay() + ', del ' + tiempo.getFullYear(),
      edad: (actual.getFullYear() - tiempo.getFullYear()) + ' años',
      age: (actual.getFullYear() - tiempo.getFullYear()),
      fecha: tiempo.getMonth() + '/' + tiempo.getDay() + '/' + tiempo.getFullYear(),
      date: tiempo.getFullYear() + '/' + tiempo.getMonth() + '/' + tiempo.getDay(),
      time: tiempo,
      birthdate: tiempo.getDay() + ' de ' + this.tenerMes(tiempo.getMonth())
    };

  }
}
