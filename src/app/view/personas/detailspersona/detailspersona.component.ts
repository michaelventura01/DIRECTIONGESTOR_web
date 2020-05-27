import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { ActanacimientoService } from 'src/app/services/actanacimiento.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detailspersona',
  templateUrl: './detailspersona.component.html',
  styleUrls: ['./detailspersona.component.css']
})
export class DetailspersonaComponent implements OnInit {
  idPersona: string;
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  actasNacimientos: Array<any> = new Array<any>();
  circunscripciones: Array<any> = new Array<any>();
  documentos: Array<any> = new Array<any>();
  relacionados: Array<any> = new Array<any>();
  tipoTelefonos: Array<any> = new Array<any>();
  tipoDocumentos: Array<any> = new Array<any>();
  tiposRelaciones: Array<any> = new Array<any>();
  observaciones: Array<any> = new Array<any>();
  salud: string;
  institucion: string;
  conducta: string;
  responsabilidad: string;
  esSalud: boolean;
  esConducta: boolean;
  esResponsabilidad: boolean;
  observacionFormulario: FormGroup;


  constructor(
    private personaServicio: PersonaService,
    private persona: ActivatedRoute,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private contactoServicio: ContactoService,
    private actaNacimientoServicio: ActanacimientoService,
    private router: Router,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private formBuilder: FormBuilder
  ) {
    this.idPersona = this.persona.snapshot.params.id;

  }

  ngOnInit() {
    this.formularioObservacion();
    this.conducta = '';
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.sexos = this.personaServicio.verSexos();
    this.tipoTelefonos = this.contactoServicio.tipoTelefonos();
    this.actasNacimientos = this.actaNacimientoServicio.verActasNacimientos();
    this.documentos = this.actaNacimientoServicio.verDocumentos();
    this.circunscripciones = this.actaNacimientoServicio.verCircunscripciones();
    this.documentos = this.actaNacimientoServicio.verDocumentos();
    this.tipoDocumentos = this.actaNacimientoServicio.verTiposDocumentos();
    this.relacionados = this.personaServicio.verRelaciones();
    this.tiposRelaciones = this.personaServicio.verTiposRelaciones();
    this.observaciones = this.personaServicio.verObservaciones();
    this.institucion = localStorage.getItem('instituto');
    this.esSalud = false;
    this.esConducta = false;
    this.esResponsabilidad = false;
  }

  cambiarObservacion(tipo) {

    if ( tipo === '01' ) {
      if ( this.esConducta ) {
        this.esConducta = false;
      } else {
        this.esConducta = true;
      }
    }

    if ( tipo === '02' ) {
      if ( this.esResponsabilidad ) {
        this.esResponsabilidad = false;
      } else {
        this.esResponsabilidad = true;
      }
    }

    if ( tipo === '03' ) {
      if ( this.esSalud ) {
        this.esSalud = false;
      } else {
        this.esSalud = true;
      }
    }
  }

  eliminarPersona(persona) {
    let fecha = new Date();
    this.database.doc('personas/' + this.idPersona).update({
      Correo: persona.Correo,
      Sexo: persona.Sexo,
      Nacionalidad: persona.Nacionalidad,
      Pais: persona.Pais,
      Ciudad: persona.Ciudad,
      Direccion: persona.Direccion,
      Foto: persona.Foto,
      Estado: '',
      Nombre: persona.Nombre,
      Apellido: persona.Apellido,
      Telefono: persona.Telefono,
      TipoTelefono: persona.TipoTelefono,
      FechaNacimiento: persona.FechaNacimiento,
      FechaAgregacion: this.obtenerFecha(persona.FechaAgregacion).time,
      FechaEdicion: fecha
    }).then(() => {
      this.mensajeServicio.exito('Eliminado', 'Persona ha sido eliminada con exito');
      this.router.navigate(['/personas']);
    }).catch(() => {
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      this.router.navigate(['/personas']);
    });
  }

  tenerObservacion(tipo) {
    let observation: any;
    this.observaciones.forEach( observacion => {
      if (observacion.Persona === this.idPersona && observacion.TipoObservacion === tipo && observacion.Estado === '01') {
        observation = observacion;
      }
    });
    if (!observation) {
      observation = {Descripcion: '' }
    }
    return observation;
  }

  adicionarObservacion(tipo, observacion) {
    let fecha = new Date();
    let descripcion: string;
    if ( tipo === '01' ) { descripcion = this.observacionFormulario.value.conducta; }
    if ( tipo === '02' ) { descripcion = this.observacionFormulario.value.responsabilidad; }
    if ( tipo === '03' ) { descripcion = this.observacionFormulario.value.salud; }

    if (observacion.id) {
      if (descripcion === '' ) {
        descripcion = observacion.Descripcion;
      }
      this.database.doc('observaciones/' + observacion.id).update({
        FechaAgregacion: this.obtenerFecha( observacion.FechaAgregacion).time,
        FechaModificacion: fecha,
        Descripcion: descripcion,
        Estado: observacion.Estado,
        Institucion: this.institucion,
        Persona: this.idPersona,
        TipoObservacion: observacion.TipoObservacion
      }).then(() => {
          this.mensajeServicio.exito('Modificado', 'Observacion ha sido modificada con exito');
      }).catch(() => {
        this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      });
    } else {
      this.database.collection('observaciones').add({
        FechaAgregacion: fecha,
        Descripcion: descripcion,
        Estado: '01',
        Institucion: this.institucion,
        Persona: this.idPersona,
        TipoObservacion: tipo
      }).then(() => {
          this.mensajeServicio.exito('Guardado', 'Observacion ha sido agregada con exito');
      }).catch(() => {
        this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      });
    }

    this.observaciones = this.personaServicio.verObservaciones();
    this.cambiarObservacion(tipo);
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerActas() {
    let actasNacimientos = new Array<any>();
    this.actasNacimientos.forEach(actas => {
      if (actas.Estado === '01' && actas.Persona === this.idPersona) {
        actasNacimientos.push(actas);
      }
    });
    return actasNacimientos;
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
        this.mensajeServicio.exito('Eliminada', 'Documento ha sido Eliminado con exito');
    }).catch(() => {
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
    });
    this.documentos =  new Array<any>();
    this.documentos = this.actaNacimientoServicio.verDocumentos();
  }

  eliminarRelacion(relacion) {
    let fecha = new Date();
    this.database.doc('relaciones/' + relacion.id).update({
      Persona: relacion.Persona,
      TipoRelacion: relacion.TipoRelacion,
      Relacionado: relacion.Relacionado,
      Residencia: relacion.Residencia,
      Estado: '',
      FechaAgregacion: this.obtenerFecha(relacion.FechaAgregacion).time,
      FechaModificacion: fecha
    }).then(() => {
        this.mensajeServicio.exito('Modificado', 'Relacion ha sido eliminada con exito');
    }).catch(() => {
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
    });
    this.relacionados = new Array<any>();
    this.relacionados = this.personaServicio.verRelaciones();
  }

  eliminarActa(acta) {
    let fecha = new Date();
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
      FechaEdicion: fecha,
      Estado: ''
    }).then(() => {
      this.mensajeServicio.exito('Eliminado', 'Acta de Nacimiento ha sido eliminada con exito');
    }).catch(() => {
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
    });
    this.actasNacimientos = new Array<any>();
    this.actasNacimientos = this.actaNacimientoServicio.verActasNacimientos();
  }

  tenerRelaciones() {
    let relaciones = new Array<any>();
    this.relacionados.forEach(relacion => {
      if (relacion.Persona === this.idPersona && relacion.Estado === '01') {
        relaciones.push(relacion);
      }
    });
    return relaciones;
  }

  tenerDocumentos() {
    let documentos = new Array<any>();
    this.documentos.forEach(documento => {
      if (documento.Estado === '01' && documento.Persona === this.idPersona) {
        documentos.push(documento);
      }
    });
    return documentos;
  }

  formularioObservacion() {
    this.observacionFormulario = this.formBuilder.group({
      salud: [''],
      responsabilidad: [''],
      conducta: ['']

    });

  }

}
