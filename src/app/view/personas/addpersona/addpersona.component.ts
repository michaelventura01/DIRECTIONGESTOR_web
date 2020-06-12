import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {AngularFireStorage} from '@angular/fire/storage';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addpersona',
  templateUrl: './addpersona.component.html',
  styleUrls: ['./addpersona.component.css']
})
export class AddpersonaComponent implements OnInit {

  @Input() accion: string;
  @Input() instituto: string;
  personas: Array<any> = new Array<any>();
  formularioPersona: FormGroup;
  control: string;
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  tipoTelefonos: Array<any> = new Array<any>();
  visibleComponente: boolean;
  imagen: string;
  esImagen: boolean;
  carga: number;
  esEmpleado: boolean;
  esEstudiante: boolean;
  esPersona: boolean;
  esMenorAnioActual: boolean;
  esExistente: boolean;
  persona: string;


  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private personaServicio: PersonaService,
    private contactoServicio: ContactoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private mensajeServicio: MensajeService ) {

    }

  ngOnInit() {
    this.crearFormulario();

    if(this.accion!='Encargado'){
      this.accion = 'Persona';
    }

    this.esEmpleado = false;

    this.estados = this.estadoServicio.verEstados();


    this.sexos = this.personaServicio.verSexos();
    this.tipoTelefonos = this.contactoServicio.tipoTelefonos();
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();

    this.esImagen =false;
    this.carga = 0;
    this.esMenorAnioActual = true;

  }

  revisarFechaNacimiento(){
    let anioActual = new Date();
    anioActual.getFullYear();

    let anioNacimiento = new Date(this.formularioPersona.value.FechaNacimiento);
    anioNacimiento.getFullYear();

    if((anioActual.getFullYear() - anioNacimiento.getFullYear()) < 0 || (anioActual.getFullYear() - anioNacimiento.getFullYear())>100 ){
      this.esMenorAnioActual = false;

    }else{
      this.esMenorAnioActual = true;
    }
  }

  agregarPersona(data){
    this.spinner.show();
    let fecha = new Date();
    this.buscarPersona(data);
    this.persona = this.formularioPersona.value.Nombre+' '+this.formularioPersona.value.Apellido;
    if(!this.esExistente){
      if(this.esMenorAnioActual){
        this.persona = JSON.stringify({
          Nombre: this.formularioPersona.value.Nombre,
          Apellido: this.formularioPersona.value.Apellido,
          Foto: this.imagen,
          Correo: this.formularioPersona.value.Correo,
          Telefono: this.formularioPersona.value.Telefono,
          Direccion: this.formularioPersona.value.Direccion,
          Ciudad: this.formularioPersona.value.Ciudad,
          Pais: this.formularioPersona.value.Pais,
          Nacionalidad: this.formularioPersona.value.Nacionalidad,
          Sexo: this.formularioPersona.value.Sexo,
          FechaNacimiento: new Date(this.formularioPersona.value.FechaNacimiento),
          TipoTelefono: this.formularioPersona.value.TipoTelefono,
          FechaAgregacion: fecha,
          Estado: '01'
        });

        if(!this.esImagen){this.imagen = '';}

        this.database.collection('personas').add(
          {
            Nombre: this.formularioPersona.value.Nombre,
            Apellido: this.formularioPersona.value.Apellido,
            Foto: this.imagen,
            Correo: this.formularioPersona.value.Correo,
            Telefono: this.formularioPersona.value.Telefono,
            Direccion: this.formularioPersona.value.Direccion,
            Ciudad: this.formularioPersona.value.Ciudad,
            Pais: this.formularioPersona.value.Pais,
            Nacionalidad: this.formularioPersona.value.Nacionalidad,
            Sexo: this.formularioPersona.value.Sexo,
            FechaNacimiento: new Date(this.formularioPersona.value.FechaNacimiento),
            TipoTelefono: this.formularioPersona.value.TipoTelefono,
            FechaAgregacion: fecha,
            Estado: '01'
          }).then(()=>{
            this.spinner.hide();
          this.mensajeServicio.exito('Guardado','Persona ha sido agregada con exito');
          this.visibleComponente = false;

          if(this.accion == 'Encargado'){
            this.esEmpleado = true;
          }
          else {
            this.esPersona = true;
            this.router.navigate(['/personas']);
          }

        }).catch(() => {
          this.spinner.hide();
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');

          if(this.accion == 'Encargado'){
            this.esEmpleado = true;
            this.router.navigate(['/institucionAgregar']);
          }
          else {
            this.esPersona = true;
            this.router.navigate(['/personas']);
          }
        });
      }
    }
    else{
      this.spinner.hide();
      this.mensajeServicio.info('Registro Existente','Esta persona existe registrada en el sistema');
      if(this.accion == 'Encargado'){
        this.esEmpleado = true;
      }
      else {
        this.esPersona = true;
        this.router.navigate(['/personas']);
      }
    }
  }

  buscarPersona(dato){
    this.personas = new Array<any>();
    let people = new Array<any>();
    dato.forEach(elementos => {
      if(
        this.formularioPersona.value.Apellido === elementos.Apellido &&
        this.formularioPersona.value.Nombre === elementos.Nombre &&
        this.formularioPersona.value.Sexo === elementos.Sexo &&
        this.formularioPersona.value.Nacionalidad === elementos.Nacionalidad &&
        this.tenerFecha(elementos.FechaNacimiento).fecha === this.tenerTiempo().fecha){
          people.push(elementos);
          this.esExistente = true;
        }else{
          this.esExistente = false;
        }
    });

    this.personas = people;
    return this.personas;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerTiempo(){
    let tiempo = new Date();
    if(this.formularioPersona.value.Fecha!=''){
      tiempo = new Date(this.formularioPersona.value.FechaNacimiento);
    }
    let dia: string;
    let mes: string;
    if (tiempo.getDate() < 10 ) {
      dia = '0' + tiempo.getDate().toString();
    } else {
      dia = tiempo.getDate().toString();
    }
    if ((tiempo.getMonth() + 1) < 10 ) {
      mes = '0' + (tiempo.getMonth() + 1).toString();
    } else {
      mes = (tiempo.getMonth() + 1).toString();
    }
    return  {
      mesAno: mes + '-' + tiempo.getFullYear(),
      fecha: mes + '/' + dia + '/' + tiempo.getFullYear()
    };
  }


  subirImagen(event){

    if(event.target.files.length>0){
      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'personas/'+archivo+tipoArchivo;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(file);
      tarea.then((resultado)=>{

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

  tenerCiudades(){
    this.ciudades = this.direccionServicio.verCiudades(this.formularioPersona.value.Pais);
  }

  crearFormulario(){
    this.formularioPersona = this.formBuilder.group(
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
}
