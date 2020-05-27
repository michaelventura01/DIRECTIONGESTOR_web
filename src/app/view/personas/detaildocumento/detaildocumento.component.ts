import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PersonaService } from 'src/app/services/persona.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActanacimientoService } from 'src/app/services/actanacimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './detaildocumento.component.html',
  styleUrls: ['./detaildocumento.component.css']
})
export class DetaildocumentoComponent implements OnInit {
  actaNacimientos: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  tipoDocumentos: Array<any> = new Array<any>();
  documentos: Array<any> = new Array<any>();
  idDocumento: string;
  institucion: string;
  usuario: string;

  constructor(
    private storage: AngularFireStorage,
    private personaServicio: PersonaService,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private actanacimientoServicio: ActanacimientoService,
    private ruta: ActivatedRoute,
    private mensajeServicio: MensajeService,
    private router: Router,
    private database: AngularFirestore
  ) { }

  ngOnInit() {
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();
    this.documentos = this.actanacimientoServicio.verDocumentos();
    this.tipoDocumentos = this.actanacimientoServicio.verTiposDocumentos();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.estados = this.estadoServicio.verEstados();
    this.idDocumento = this.ruta.snapshot.params.id;
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
  }

  eliminarDocumento(documento) {
    let fecha = new Date();
    this.database.doc('documentos/' + documento.id).update({
      Persona: documento.Persona,
      Numero: documento.Numero,
      TipoDocumento: documento.TipoDocumento,
      Nacionalidad: documento.Nacionalidad,
      Pais: documento.Pais,
      Ciudad: documento.Ciudad,
      Foto: documento.Foto,
      FechaAgregacion: this.obtenerFecha(documento.FechaAgregacion).time,
      FechaModificacion: fecha,
      Estado: ''
    }).then(() => {
      this.mensajeServicio.exito('Modificado', 'Documento ha sido agregada con exito');
      this.router.navigate(['/personaDetalle', documento.Persona]);
  }).catch(() => {
    this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
    this.router.navigate(['/personaDetalle', documento.Persona ]);
  });
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

}
