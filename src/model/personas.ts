import { DocumentReference } from '@angular/fire/firestore';


export class Personas {
  id: string;
  apellido: string;
  idCiudad: string;
  correo: string;
  direccion: string;
  idEstado: string;
  fechaNacimiento: string;
  foto: string;
  idNacionalidad: string;
  nombre: string;
  idPais: string;
  idSexo: string;
  telefono: string;
  tipoTelefono: string;
  ref: DocumentReference;

}
