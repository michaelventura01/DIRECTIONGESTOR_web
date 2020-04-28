import { DocumentReference } from '@angular/fire/firestore';

export class Articulos {
  id: string;
  cantidad: number;
  codigo: string;
  descripcion: string;
  fecha: string;
  idEstado: string;
  idInstitucion: string;
  precio: number;
  idEdificio: string;
  ref: DocumentReference;

}
