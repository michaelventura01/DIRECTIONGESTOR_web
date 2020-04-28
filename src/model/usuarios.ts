import { DocumentReference } from '@angular/fire/firestore';

export class Usuarios {
  id: string;
  contrasenia: string;
  idEstado: string;
  idInstitucion: string;
  idPersona: string;
  idRol: string;
  usuario: string;
  ref: DocumentReference;
}
