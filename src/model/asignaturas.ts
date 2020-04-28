import { DocumentReference } from '@angular/fire/firestore';


export class Asignaturas {
  id: string;
  descripcion: string;
  idEstado: string;
  idInstitucion: string;
  ref: DocumentReference;

}
