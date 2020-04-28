
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-editedificio',
  templateUrl: './editedificio.component.html',
  styleUrls: ['./editedificio.component.css']
})
export class EditedificioComponent implements OnInit {
  formularioEditar: FormGroup;
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  idEdificio: string;
  carga: number;
  imagen: string;
  esImagen: boolean;
  estado: string;
  esEstado: boolean;
  pais: string;
  esPais: boolean;
  ciudad: string;
  esCiudad: boolean;
  nombre: string;
  direccion: string;
  institucion: string;


  constructor(
    private formBuilder: FormBuilder,
    private ruta: ActivatedRoute,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private edificioServicio: EdificioService,
    private storage : AngularFireStorage,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.editarFormulario();
    this.idEdificio = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.paises = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion= localStorage.getItem('instituto');
    this.carga = 0;
    this.esEstado = false;
    this.esCiudad = false;
    this.esPais = false;
    this.imagen = '';
  }

  tenerCiudades(data){
    this.ciudades = new Array<any>();
    this.ciudades = this.direccionServicio.verCiudades(data);
  }

  editarEdificio(dato){

    this.direccion = this.formularioEditar.value.Direccion;
    this.ciudad = this.formularioEditar.value.Ciudad;
    this.estado = this.formularioEditar.value.Estado;
    this.nombre = this.formularioEditar.value.Descripcion;
    this.pais = this.formularioEditar.value.Pais;
    this.institucion = dato.Institucion;


    if(this.ciudad==''){
      this.ciudad = dato.Ciudad;
    }
    if(this.estado==''){
      this.estado = dato.Estado;
    }
    if(this.nombre==''){
      this.nombre = dato.Nombre
    }
    if(this.pais == ''){
      this.pais = dato.Pais;
    }
    if(this.direccion == ''){
      this.direccion = dato.Direccion;
    }
    if(this.imagen == ''){
      this.imagen = dato.Foto;
    }
    this.database.doc('edificios/'+this.idEdificio).update({
      Ciudad : this.ciudad,
      Direccion: this.direccion,
      Estado:this.estado,
      Foto:this.imagen,
      Institucion: this.institucion,
      Nombre:this.nombre,
      Pais:this.pais
    }).then(()=>{
      this.mensajeServicio.exito('Actualizado','Edificio ha sido actualizado con exito');
      this.router.navigate(['/edificioDetalle', this.idEdificio]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/edificioDetalle', this.idEdificio]);
    });
  }

  subirImagen(event){
    if(event.target.files.length > 0 ){
      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'edificios/' + archivo + tipoArchivo;
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

  tenerPais(){
    this.esPais = true;
  }
  tenerCiudad(){
    this.esCiudad = true;
  }
  tenerEstado(){
    this.esEstado = true;
  }

  asignarEstado(){
    this.estado = this.formularioEditar.value.Estado;
  }

  tenerEstadosEdificios(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '06') {
        state.push(dato);
      }
    });
    return state
  }

  tenerEdificio(){
    let edificios: Array<any> = new Array<any>();
    this.edificios.forEach(data => {
      if(this.idEdificio === data.id){
        edificios.push(data);
      }
    });

    return edificios;
  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Descripcion: [''],
        Pais: [''],
        Ciudad: [''],
        Barrio: [''],
        Direccion: [''],
        Estado: [''],
        Foto: ['']
      }
    );
  }

}
