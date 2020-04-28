import { DocumentReference } from '@angular/fire/firestore';

export class Cuentas {
  id: string;
  fecha: string;
  idEstado: string;
  idInstitucion: string;
  idPersona: string;
  idTipoCuenta: string;
  monto: number;
  ref: DocumentReference;


}
