import { DocumentReference } from '@angular/fire/firestore';

export class Movimientos {
  id: string;
  descripcion: string;
  fecha: string;
  hora: string;
  idEstado: string;
  idInstitucion: string;
  idTipoMovimiento: string;
  monto: number;
  ref: DocumentReference;
}
