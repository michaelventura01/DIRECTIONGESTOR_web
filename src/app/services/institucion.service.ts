import { Injectable } from '@angular/core';
import { Instituciones } from 'src/model/instituciones';
import { AngularFirestore} from '@angular/fire/firestore';
import { EstadoService } from 'src/app/services/estado.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  institucion: Instituciones = new Instituciones();
  instituciones: Array<Instituciones> = new Array<Instituciones>();
  tipoTelefono: any;
  estado: any;
  idInstitucion : string;

  constructor(
    private database: AngularFirestore,
    private estadoServicio: EstadoService,
    private contactoServicio: ContactoService) {  }

  verInstituciones() {
    this.instituciones = new Array<Instituciones>();
    this.database.collection<Instituciones>('instituciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let instituto = contenido.data() as Instituciones;
        instituto.id = contenido.id;
        instituto.ref = contenido.ref;
        this.instituciones.push(instituto);
      });

    });
    return this.instituciones;
  }

  verInstitucion(id: string) {
    this.instituciones = new Array<Instituciones>();
    this.database.collection<Instituciones>('instituciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        if (id === contenido.id){
          let instituto = contenido.data() as Instituciones;
          instituto.id = contenido.id;
          instituto.ref = contenido.ref;
          this.instituciones.push(instituto);
        }
      });
    });
    return this.instituciones;
  }



}
