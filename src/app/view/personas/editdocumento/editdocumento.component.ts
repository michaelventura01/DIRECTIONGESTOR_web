import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ActanacimientoService } from 'src/app/services/actanacimiento.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { EstadoService } from 'src/app/services/estado.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: './editdocumento.component.html',
  styleUrls: ['./editdocumento.component.css']
})
export class EditdocumentoComponent implements OnInit {

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
  formularioCreado: FormGroup;
  imagen: string;
  esImagen: boolean;
  esTipo: boolean;
  esNacionalidad: boolean;
  esPais: boolean;
  esCiudad: boolean;
  esEstado: boolean;
  carga: number;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private personaServicio: PersonaService,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private actanacimientoServicio: ActanacimientoService,
    private ruta: ActivatedRoute,
    private mensajeServicio: MensajeService,
    private router: Router,
    private database: AngularFirestore,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.crearFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();
    this.documentos = this.actanacimientoServicio.verDocumentos();
    this.tipoDocumentos = this.actanacimientoServicio.verTiposDocumentos();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.estados = this.estadoServicio.verEstados();
    this.idDocumento = this.ruta.snapshot.params.id;
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.esImagen = false;
    this.esTipo = false;
    this.esNacionalidad = false;
    this.esPais = false;
    this.esCiudad = false;
    this.esEstado = false;
    this.imagen = '';
    this.esImagen = false;
    this.carga = 0;
  }

  cambiarTipo() {
    this.esTipo = true;
  }

  cambiarNacionalidad() {
    this.esNacionalidad = true;
  }

  cambiarPais() {
    this.esPais = true;
  }

  cambiarCiudad() {
    this.esCiudad = true;
  }

  cambiarEstado() {
    this.esEstado = true;
  }

  tenerEstados() {
    let estados = new Array<any>();
    this.estados.forEach(estado => {
      if (estado.iddominioestado === '00' || estado.iddominioestado === '02') {
        estados.push(estado);
      }
    });

    return estados;
  }

  buscarDocumento() {
    let document: any;
    this.documentos.forEach(documento => {
      if (documento.Numero === this.formularioCreado.value.Numero &&
        documento.TipoDocumento === this.formularioCreado.value.TipoDocumento &&
        documento.Pais === this.formularioCreado.value.Pais  && documento.Estado !== ''
        ) {
        document = documento;
      }
    });
    return document;
  }

  editarDocumento(documento) {
    this.spinner.show();
    let fecha = new Date();
    if (!this.esImagen) {this.imagen = ''; }


    let numero = this.formularioCreado.value.Numero;
    if (numero === '') { numero = documento.Numero; }

    let tipo = this.formularioCreado.value.TipoDocumento;
    if ( tipo === '' ){ tipo = documento.TipoDocumento; }

    let nacionalidad = this.formularioCreado.value.Nacionalidad;
    if ( nacionalidad === '') { nacionalidad = documento.Nacionalidad; }

    let pais = this.formularioCreado.value.Pais;
    if ( pais === '' ) { pais = documento.Pais; }

    let ciudad = this.formularioCreado.value.Ciudad;
    if ( ciudad === '' ) { ciudad = documento.Ciudad; }

    let foto = this.imagen;
    if ( foto === '' ) { foto = documento.Foto; }

    let estado = this.formularioCreado.value.Estado;
    if ( estado === '' ) { estado = documento.Estado; }


    if (!this.buscarDocumento()) {
      this.database.doc('documentos/' + this.idDocumento).update({
        Persona: documento.Persona,
        Numero: numero,
        TipoDocumento: tipo,
        Nacionalidad: nacionalidad,
        Pais: pais,
        Ciudad: ciudad,
        Foto: foto,
        FechaAgregacion: this.obtenerFecha(documento.FechaAgregacion).time,
        FechaModificacion: fecha,
        Estado: estado
      }).then(() => {
        this.spinner.hide();
        this.mensajeServicio.exito('Modificado', 'Documento ha sido agregada con exito');
        this.router.navigate(['/personaDetalle', documento.Persona]);
      }).catch(() => {
        this.spinner.hide();
        this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
        this.router.navigate(['/personaDetalle', documento.Persona ]);
      });
    } else {
      this.mensajeServicio.info('Registro Existente', 'Documento fue Agregada Anteriormente');
      this.router.navigate(['/personaDetalle', documento.Persona ]);
    }
  }


  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerCiudades(){
    this.ciudades = new Array<any>();
    this.esCiudad = true;
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
      Nacionalidad: ['', Validators.required],
      Estado: ['', Validators.required]
      }
    );
  }

}
