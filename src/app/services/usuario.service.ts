import { Injectable } from '@angular/core';
import { Usuarios } from 'src/model/usuarios';
import { Instituciones } from 'src/model/instituciones';
import { Personas } from 'src/model/personas';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuarios = new Usuarios();
  institucion: Instituciones = new Instituciones();
  persona: Personas = new Personas();
  usuarios: Array<Usuarios> = new Array<Usuarios>();
  constructor(private database: AngularFirestore) { }


  verUsuarios() {
    this.usuarios = new Array<Usuarios>();
    this.database.collection<Usuarios>('usuarios').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let persona = contenido.data() as Usuarios;
        persona.id = contenido.id;
        persona.ref = contenido.ref;
        this.usuarios.push(persona);
      });
    });
    return this.usuarios;
  }



  verRoles() {
    let roles: Array<any> = new Array<any>();
    this.database.collection('roles').valueChanges().subscribe((resultado) => {
      resultado.forEach((valor) => {
        roles.push(valor);
      });
    });
    return roles;
  }
}
