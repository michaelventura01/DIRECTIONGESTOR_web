
import { DocumentReference } from '@angular/fire/firestore';

export class Instituciones {
  id: string;
  correo: string;
  descripcion: string;
  idEstado: string;
  nombre: string;
  telefono: string;
  tipoTelefono: string;
  ref: DocumentReference;


}
