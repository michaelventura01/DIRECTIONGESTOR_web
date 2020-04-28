import { DocumentReference } from '@angular/fire/firestore';

export class Estudiantes {
  id: string;
  codigo: string;
  idEstado: string;
  idPersona: string;
  mensualidad: number;
  ref: DocumentReference;

}
