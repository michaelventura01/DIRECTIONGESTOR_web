import { DocumentReference } from '@angular/fire/firestore';

export class Calificaciones {
  id: string;
  calificacion: number;
  fecha: Date;
  idAsignatura: string;
  idEstado: string;
  ref: DocumentReference;

}
