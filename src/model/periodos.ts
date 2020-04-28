// tslint:disable-next-line: no-empty-interface

import { DocumentReference } from '@angular/fire/firestore';

export class Periodos {
  descripcion: string;
  idEstado: string;
  fechaInicio: string;
  fechaFin: string;
  ref: DocumentReference;
  id: string;
}
