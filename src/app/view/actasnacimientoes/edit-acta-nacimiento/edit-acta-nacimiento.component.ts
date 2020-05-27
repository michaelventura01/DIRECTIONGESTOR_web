import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { PersonaService } from 'src/app/services/persona.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ActanacimientoService } from 'src/app/services/actanacimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-edit-acta-nacimiento',
  templateUrl: './edit-acta-nacimiento.component.html',
  styleUrls: ['./edit-acta-nacimiento.component.css']
})
export class EditActaNacimientoComponent implements OnInit {
  actaNacimientos: Array<any> = new Array<any>();
  circunscripciones: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  idPersona: string;
  institucion: string;
  usuario: string;
  formularioCreado: FormGroup;
  imagen: string;
  esImagen: boolean;
  esCircunscripcion: boolean;
  esNacionalidad: boolean;
  esPais: boolean;
  esCiudad: boolean;
  esEstado: boolean;
  carga: number;
  idActaNacimiento: string;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private personaServicio: PersonaService,
    private direccionServicio: DireccionService,
    private actanacimientoServicio: ActanacimientoService,
    private ruta: ActivatedRoute,
    private mensajeServicio: MensajeService,
    private router: Router,
    private estadoServicio: EstadoService,
    private database: AngularFirestore ) { }

  ngOnInit() {
    this.crearFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.actaNacimientos = this.actanacimientoServicio.verActasNacimientos();
    this.circunscripciones = this.actanacimientoServicio.verCircunscripciones();
    this.estados = this.estadoServicio.verEstados();
    this.idActaNacimiento = this.ruta.snapshot.params['id'];
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.esImagen = false;
    this.carga = 0;
    this.esCircunscripcion = false;
    this.esNacionalidad = false;
    this.esPais = false;
    this.esCiudad = false;
    this.esEstado = false;
  }

  cambiarCircunscripcion() {
    this.esCircunscripcion = true;
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



  buscarActaNacimiento() {
    let actaNacimiento: any;
    this.actaNacimientos.forEach(acta => {
      if (acta.Folio === this.formularioCreado.value.Folio && acta.Anio === this.formularioCreado.value.Anio &&
        acta.Libro === this.formularioCreado.value.Libro && acta.Numero ===  this.formularioCreado.value.Numero &&
        acta.Circunscripcion === this.formularioCreado.value.Circunscripcion  &&
        acta.Nacionalidad === this.formularioCreado.value.Nacionalidad && acta.Pais === this.formularioCreado.value.Pais &&
        acta.Ciudad === this.formularioCreado.value.Ciudad && acta.Estado !== ''
        ) {
        actaNacimiento = acta;
      }
    });
    return actaNacimiento;
  }

  editarActaNacimiento(acta) {

    let fecha = new Date();
    if (!this.esImagen) {this.imagen = ''; }

    let folio = this.formularioCreado.value.Folio;
    if (folio === '') {
      folio = acta.Folio;
    }
    let anio = this.formularioCreado.value.Anio;
    if (anio === '') {
      anio = acta.Anio;
    }
    let libro = this.formularioCreado.value.Libro;
    if (libro === '') {
      libro = acta.Libro;
    }
    let numero = this.formularioCreado.value.Numero;
    if (numero === ''){
      numero = acta.Numero;
    }
    let circunscripcion = this.formularioCreado.value.Circunscripcion;
    if (circunscripcion === '') {
      circunscripcion = acta.Circunscripcion;
    }
    let nacionalidad = this.formularioCreado.value.Nacionalidad;
    if (nacionalidad === '') {
      nacionalidad = acta.Nacionalidad;
    }
    let pais = this.formularioCreado.value.Pais;
    if (pais === '') {
      pais = acta.Pais;
    }
    let ciudad = this.formularioCreado.value.Ciudad;
    if (ciudad === '') {
      ciudad = acta.Ciudad;
    }
    let foto = this.imagen;
    if (foto === '') {
      foto = acta.Foto;
    }

    let estado = this.formularioCreado.value.Estado;
    if (estado === '') {
      estado = acta.Estado;
    }

    if (!this.buscarActaNacimiento()) {

      this.database.doc('actanacimientos/' + acta.id).update({
        Persona: acta.Persona,
        Folio: folio,
        Anio: anio,
        Libro: libro,
        Numero: numero,
        Circunscripcion: circunscripcion,
        Nacionalidad: nacionalidad,
        Pais: pais,
        Ciudad: ciudad,
        Foto: foto,
        FechaAgregacion: this.obtenerFecha(acta.FechaAgregacion).time ,
        FechaEdicion: fecha,
        Estado: estado
      }).then(() => {
        this.mensajeServicio.exito('Actualizado','Acta de Nacimiento ha sido actualizada con exito');
        this.router.navigate(['/personaDetalle', acta.Persona]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/personaDetalle', acta.Persona]);
      });
    } else {
      this.mensajeServicio.info('Registro Existente', 'Acta de Nacimiento no pudo ser Actualizada');
      this.router.navigate(['/personaDetalle', this.idPersona]);
    }
  }


  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
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

  tenerCiudades() {
    let ciudades = new Array<any>();
    ciudades = this.direccionServicio.verCiudades(this.formularioCreado.value.Pais);
    this.cambiarCiudad();
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
      Folio: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(6)
      ])],
      Anio: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(4)
      ])],
      Numero: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(6)
      ])],
      Libro: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(7)
      ])],
      Circunscripcion: [''],
      Foto: [''],
      Pais: [''],
      Ciudad: [''],
      Nacionalidad: [''],
      Estado: ['']
      }
    );
  }
}
