import { DocumentReference } from '@angular/fire/firestore';

export class Archivos {
  id: string;
  ref: DocumentReference;
  enlace: string;
  fecha: Date;
  hora: string;
  idEstado: string;
  idTipoArchivo: string;

}
