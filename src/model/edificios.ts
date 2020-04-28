import { DocumentReference } from '@angular/fire/firestore';

export class Edificios {
  id: string;
  direccion: string;
  idEstado: string;
  idInstitucion: string;
  idCiudad: string;
  ref: DocumentReference;

}
