import { DocumentReference } from '@angular/fire/firestore';

export class Tareas {
  id: string;
  descripcion: string;
  fecha: string;
  hora: string;
  idEstado: string;
  idInstitucion: string;
  idPrioridad: string;
  titulo: string;
  REF: DocumentReference;

}
