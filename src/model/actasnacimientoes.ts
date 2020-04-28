import { DocumentReference } from '@angular/fire/firestore';

export class Actasnacimientoes {
  id: string;
  idPersona: string;
  folio: string;
  anio: number;
  libro: string;
  numero: number;
  idCircunscripcion: string;
  idEstado: string;
  idArchivo: string;
  ref: DocumentReference;
}
