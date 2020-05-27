import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { PersonaService } from 'src/app/services/persona.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ActanacimientoService } from 'src/app/services/actanacimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './adddocumento.component.html',
  styleUrls: ['./adddocumento.component.css']
})
export class AdddocumentoComponent implements OnInit {

  actaNacimientos: Array<any> = new Array<any>();
  circunscripciones: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  tipoDocumentos: Array<any> = new Array<any>();
  documentos: Array<any> = new Array<any>();
  idPersona: string;
  institucion: string;
  usuario: string;
  formularioCreado: FormGroup;
  imagen: string;
  esImagen: boolean;
  carga: number;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private personaServicio: PersonaService,
    private direccionServicio: DireccionService,
    private actanacimientoServicio: ActanacimientoService,
    private ruta: ActivatedRoute,
    private mensajeServicio: MensajeService,
    private router: Router,
    private database: AngularFirestore ) { }

  ngOnInit() {
    this.crearFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();
    this.documentos = this.actanacimientoServicio.verDocumentos();
    this.tipoDocumentos = this.actanacimientoServicio.verTiposDocumentos();
    this.idPersona = this.ruta.snapshot.params['persona'];
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.esImagen = false;
    this.carga = 0;
  }

  buscarDocumento() {
    let document: any;
    this.documentos.forEach(documento => {
      if (documento.Numero === this.formularioCreado.value.Numero &&
        documento.TipoDocumento === this.formularioCreado.value.TipoDocumento &&
        documento.Pais === this.formularioCreado.value.Pais
        ) {
        document = documento;
      }
    });
    return document;
  }

  agregarDocumento() {
    let fecha = new Date();
    if (!this.buscarDocumento()) {
      if (!this.esImagen) {this.imagen = ''; }

      this.database.collection('documentos').add({
        Persona: this.idPersona,
        Numero: this.formularioCreado.value.Numero,
        TipoDocumento: this.formularioCreado.value.TipoDocumento,
        Nacionalidad: this.formularioCreado.value.Nacionalidad,
        Pais: this.formularioCreado.value.Pais,
        Ciudad: this.formularioCreado.value.Ciudad,
        Foto: this.imagen,
        FechaAgregacion: fecha,
        Estado: '01'
        }).then(() => {
          this.mensajeServicio.exito('Guardado', 'Documento ha sido agregada con exito');
          this.router.navigate(['/personaDetalle', this.idPersona]);
      }).catch(() => {
        this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
        this.router.navigate(['/personaDetalle', this.idPersona]);
      });
    } else {
      this.mensajeServicio.info('Registro Existente', 'Acta de Nacimiento fue Agregada Anteriormente');
      this.router.navigate(['/personaDetalle', this.idPersona]);
    }
  }


  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerCiudades(){
    this.ciudades = this.direccionServicio.verCiudades(this.formularioCreado.value.Pais);
  }

  subirImagen(event){
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'documentos/' + archivo + tipoArchivo;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(file);
      tarea.then((resultado) => {

        this.carga = 0;
      });

      tarea.percentageChanges().subscribe(respuesta => {
        this.carga = parseInt(respuesta.toString());
        referencia.getDownloadURL().subscribe(resultado => {
          this.imagen = resultado;
          this.esImagen = true;
        });
      });
    }
  }


  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Numero: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ])],
      TipoDocumento: ['', Validators.required],
      Foto: [''],
      Pais: ['', Validators.required],
      Ciudad: ['', Validators.required],
      Nacionalidad: ['', Validators.required]
      }
    );
  }

}
