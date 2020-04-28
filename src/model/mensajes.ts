import { DocumentReference } from '@angular/fire/firestore';

export class Mensajes {
  id: string;
  idEstado: string;
  idUsuarioEmisor: string;
  idUsuarioReceptor: string;
  tituloMensaje: string;
  descripcion: string;
  ref: DocumentReference;

}
