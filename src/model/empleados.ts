import { DocumentReference } from '@angular/fire/firestore';


export class Empleados {
  id: string;
  codigo: string;
  idEstado: string;
  idPersona: string;
  idPuestoTrabajo: string;
  sueldo: number;
  ref: DocumentReference;

}
