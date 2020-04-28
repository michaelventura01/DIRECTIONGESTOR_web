
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editpersona',
  templateUrl: './editpersona.component.html',
  styleUrls: ['./editpersona.component.css']
})
export class EditpersonaComponent implements OnInit {
  formularioEditar: FormGroup;
  idPersona: string;
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  tipoTelefonos: Array<any> = new Array<any>();
  control: string;
  imagen: string;
  visibleComponente: boolean;
  carga: number;
  esMenorAnioActual: boolean;
  esImagen: boolean;
  esCambioFecha: boolean;
  esCiudadActiva: boolean;

  Correo: string;
  Fecha: string;
  Sexo: string;
  Nacionalidad: string;
  Pais: string;
  Ciudad: string;
  Direccion: string;
  Foto: string;
  Estado: string;
  Nombre: string;
  Apellido: string;
  Telefono: string;
  TipoTelefono: string;
  FechaNacimiento: Date;

  constructor(
    private formBuilder: FormBuilder,
    private mensajeServicio: MensajeService,
    private personaServicio: PersonaService,
    private ruta: ActivatedRoute,
    private router: Router,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private contactoServicio: ContactoService,
    private database: AngularFirestore,
    private storage: AngularFireStorage ) {
    this.idPersona = this.ruta.snapshot.params['id'];
  }

  ngOnInit() {
    this.esCiudadActiva = false;
    this.esMenorAnioActual = true;
    this.esImagen = false;
    this.esCambioFecha = false;
    this.carga = 0;
    this.editarFormulario();
    this.personas = this.personaServicio.verPersona(this.idPersona);
    this.sexos = this.personaServicio.verSexos();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.estados = this.estadoServicio.verEstados();
    this.paises = this.direccionServicio.verPaises();
    this.tipoTelefonos = this.contactoServicio.tipoTelefonos();
  }

  cambiarFechaNacimiento(){
    this.esCambioFecha = true;
    this.esMenorAnioActual = false;
  }

  activarCiudad(){
    this.esCiudadActiva = true;
  }

  editarFormulario() {
    this.formularioEditar = this.formBuilder.group(
    {
      Nombre  : ['', Validators.compose([Validators.required])],
      Apellido  : ['', Validators.compose([Validators.required])],
      Foto  : [''],
      Correo  : ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
      Telefono  : ['', Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      ])],
      Direccion  : ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_./# +-]+,[a-zA-Z0-9_.# +-]+$')])],
      Ciudad  : ['', Validators.compose([Validators.required])],
      Pais  : ['', Validators.compose([Validators.required])],
      Nacionalidad  : ['', Validators.compose([Validators.required])],
      Sexo  : ['', Validators.compose([Validators.required])],
      FechaNacimiento : ['', Validators.compose([Validators.required])],
      TipoTelefono: ['', Validators.required]
    });
  }

  subirImagen(event){
    if(event.target.files.length > 0 ){
      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'personas/' + archivo + tipoArchivo;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(file);
      tarea.then((resultado) => {

        this.carga = 0;
      });

      tarea.percentageChanges().subscribe(respuesta => {
        this.carga = parseInt( respuesta.toString() );
        referencia.getDownloadURL().subscribe(resultado => {
          this.imagen = resultado;
          this.esImagen = true;
        });
      });
    }
  }

  tenerCiudades(){
    this.ciudades = new Array<any>();
    this.ciudades = this.direccionServicio.verCiudades(this.formularioEditar.value.Pais);
    this.activarCiudad();
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  revisarFechaNacimiento(){
    let anioActual = new Date();
    anioActual.getFullYear();

    let anioNacimiento = new Date(this.formularioEditar.value.FechaNacimiento);
    anioNacimiento.getFullYear();

    if((anioActual.getFullYear() - anioNacimiento.getFullYear()) < 0 || (anioActual.getFullYear() - anioNacimiento.getFullYear())>100 ){
      this.esMenorAnioActual = false;

    } else {
      this.esMenorAnioActual = true;
    }
  }

  verPersona(data) {
    this.router.navigate(['/personaEditar', data]);
  }

  editarPersona(data){

    if (this.esMenorAnioActual) {
      if (this.formularioEditar.value.Nombre === '') {
        this.Nombre = data.Nombre;
      } else {
        this.Nombre = this.formularioEditar.value.Nombre;
      }

      if (this.formularioEditar.value.Apellido === '') {
        this.Apellido = data.Apellido;
      } else {
        this.Apellido = this.formularioEditar.value.Apellido;
      }

      if (this.formularioEditar.value.FechaNacimiento === '') {
        this.FechaNacimiento = this.obtenerFecha(data.FechaNacimiento).time;
      } else {
        this.FechaNacimiento = new Date(this.formularioEditar.value.FechaNacimiento);
      }

      if (this.formularioEditar.value.Sexo === '') {
        this.Sexo = data.Sexo;
      } else {
        this.Sexo = this.formularioEditar.value.Sexo;
      }

      if (this.formularioEditar.value.Nacionalidad === '') {
        this.Nacionalidad = data.Nacionalidad;
      } else {
        this.Nacionalidad = this.formularioEditar.value.Nacionalidad;
      }

      if (this.formularioEditar.value.Pais === '') {
        this.Pais = data.Pais;
      } else {
        this.Pais = this.formularioEditar.value.Pais;
      }

      if (this.formularioEditar.value.Ciudad === '') {
        this.Ciudad = data.Ciudad;
      } else {
        this.Ciudad = this.formularioEditar.value.Ciudad;
      }

      if (this.formularioEditar.value.Direccion === '') {
        this.Direccion = data.Direccion;
      } else {
        this.Direccion = this.formularioEditar.value.Direccion;
      }

      if (this.formularioEditar.value.TipoTelefono === '') {
        this.TipoTelefono = data.TipoTelefono;
      } else {
        this.TipoTelefono = this.formularioEditar.value.TipoTelefono;
      }

      if (this.formularioEditar.value.Telefono === '') {
        this.Telefono = data.Telefono;
      } else {
        this.Telefono = this.formularioEditar.value.Telefono;
      }

      if (this.formularioEditar.value.Correo === '') {
        this.Correo = data.Correo;
      } else {
        this.Correo = this.formularioEditar.value.Correo;
      }

      if (this.formularioEditar.value.Foto === '') {
        this.Foto = data.Foto;
      } else {
        this.Foto = this.imagen;
      }

      this.database.doc('personas/' + this.idPersona).update({
        Correo: this.Correo,
        Sexo: this.Sexo,
        Nacionalidad: this.Nacionalidad,
        Pais: this.Pais,
        Ciudad: this.Ciudad,
        Direccion: this.Direccion,
        Foto: this.Foto,
        Estado: '01',
        Nombre: this.Nombre,
        Apellido: this.Apellido,
        Telefono: this.Telefono,
        TipoTelefono: this.TipoTelefono,
        FechaNacimiento: this.FechaNacimiento
      }).then(() => {
        this.mensajeServicio.exito('Actualizado','Institucion ha sido actualizada con exito');
        this.router.navigate(['/personaDetalle', this.idPersona]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/personaDetalle', this.idPersona]);
      });
    }
  }
}
