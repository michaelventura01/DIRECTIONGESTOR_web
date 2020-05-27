import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { ActanacimientoService } from 'src/app/services/actanacimiento.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EstadoService } from 'src/app/services/estado.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-detailsactanacimiento',
  templateUrl: './detailsactanacimiento.component.html',
  styleUrls: ['./detailsactanacimiento.component.css']
})
export class DetailsactanacimientoComponent implements OnInit {

  idActaNacimiento: string;
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  actasNacimientos: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  nacionalidades: Array<any> = new Array<any>();
  circunscripciones: Array<any> = new Array<any>();

  constructor(
    private ruta: ActivatedRoute,
    private personaServicio: PersonaService,
    private actaNacimientoServicio: ActanacimientoService,
    private direcionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idActaNacimiento = this.ruta.snapshot.params['id'];
    this.personas = this.personaServicio.verPersonas();
    this.actasNacimientos = this.actaNacimientoServicio.verActasNacimientos();
    this.paises = this.direcionServicio.verPaises();
    this.ciudades = this.direcionServicio.verCiudadesAll();
    this.circunscripciones = this.actaNacimientoServicio.verCircunscripciones();
    this.estados = this.estadoServicio.verEstados();
  }

  eliminarActa(acta){
    this.database.doc('actanacimientos/' + acta.id).update({
      Persona: acta.Persona,
      Folio: acta.Folio,
      Anio: acta.Anio,
      Libro: acta.Libro,
      Numero: acta.Numero,
      Circunscripcion: acta.Circunscripcion,
      Nacionalidad: acta.Nacionalidad,
      Pais: acta.Pais,
      Ciudad: acta.Ciudad,
      Foto: acta.Foto,
      FechaAgregacion: this.obtenerFecha(acta.FechaAgregacion).time ,
      FechaEdicion: this.obtenerFecha(acta.FechaEdicion).time,
      Estado: ''
    }).then(() => {
      this.mensajeServicio.exito('Eliminado', 'Acta de Nacimiento ha sido eliminado con exito');
      this.router.navigate(['/personaDetalle', acta.Persona]);
    }).catch(() => {
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      this.router.navigate(['/personaDetalle', acta.Persona]);
    });
  }

  obtenerFecha(data) {
    return this.personaServicio.obtenerFecha(data);
  }

}
