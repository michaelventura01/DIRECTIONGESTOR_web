import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdificioService } from 'src/app/services/edificio.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-editArticulo',
  templateUrl: './editArticulo.component.html',
  styleUrls: ['./editArticulo.component.css']
})
export class EditArticuloComponent implements OnInit {
  articulo: string;
  codigo: string;
  cantidad: number;
  precio: number;

  formularioEditar: FormGroup;
  imagen: string;
  esImagen: boolean;
  carga: number;
  esCarga: boolean;
  edificios: Array<any> = new Array<any>();
  articulos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  edificio: string;
  esEdificio: boolean;
  fechaInicio: Date;
  esFechaInicio: boolean;
  fechaFin: Date;
  esFechaFin: boolean;
  descripcion: string;
  esEstado: boolean;
  estado: string;
  idArticulo: string;


  constructor(
    private formBuilder: FormBuilder,
    private edificioServicio: EdificioService,
    private articuloServicio: ArticuloService,
    private estadoServicio: EstadoService,
    private ruta: ActivatedRoute,
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private router: Router,
    private mensajeServicio: MensajeService,
    private personaServicio: PersonaService) { }

  ngOnInit() {
    this.crearFormulario();
    this.carga = 0;
    this.esCarga = false;
    this.esImagen = false;
    this.esFechaInicio = false;
    this.esFechaFin = false;
    this.esEstado = false;
    this.esEdificio = false;

    this.institucion = localStorage.getItem('instituto');
    this.edificios = this.edificioServicio.verEdificios();
    this.articulos = this.articuloServicio.verArticulos();
    this.estados = this.estadoServicio.verEstados();
    this.imagen = '';
    this.idArticulo = this.ruta.snapshot.params['id']
  }

  crearFormulario() {
    this.formularioEditar = this.formBuilder.group(
    {
      Articulo: [''],
      Cantidad: [''],
      Precio: [''],
      Codigo: [{value:'', disabled: true}],
      Fecha: [''],
      FechaFin: [''],
      Descripcion: [''],
      Estado: [''],
      Edificio: [''],
      Foto:['']
    }
    );
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }


  subirImagen(event){
    if(event.target.files.length > 0 ){
      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'articulos/' + archivo + tipoArchivo;
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

  tenerEstados(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '09') {
        state.push(dato);
      }
    });
    return state
  }

  tenerEdificios(){
    let edificios: Array<any> = new Array<any>();
    this.edificios.forEach(data=>{
      if(data.Estado == '01' && data.Institucion == this.institucion){
        edificios.push(data);
      }
    });
    return edificios;
  }

  cambiarFechaInicio(){
    this.esFechaInicio = true;
  }

  cambiarFechaFin(){
    this.esFechaFin = true;
  }

  cambiarEdifiio(){
    this.esEdificio = true;
  }

  cambiarEstado(){
    this.esEstado = true;
    if(this.formularioEditar.value.Estado !== '01'){
      this.esFechaFin = true;
    } else {
      this.esFechaFin = false;
    }

  }

  editarArticulo(articulo) {

    if(this.imagen === ''){this.imagen = articulo.Foto; }

    this.edificio = this.formularioEditar.value.Edificio;
    if (this.edificio === '') {
      this.edificio = articulo.Edificio;
    }
    this.descripcion = this.formularioEditar.value.Descripcion;
    if (this.descripcion === '') {
      this.descripcion = articulo.Descripcion;
    }
    this.articulo = this.formularioEditar.value.Articulo;
    if (this.articulo === '') {
      this.articulo = articulo.Articulo;
    }
    this.precio = this.formularioEditar.value.Precio * 1;
    if (this.precio === 0) {
      this.precio = articulo.Precio;
    }
    this.cantidad = this.formularioEditar.value.Cantidad * 1;
    if (this.cantidad === 0) {
      this.cantidad = articulo.Cantidad;
    }
    this.codigo = articulo.Codigo;

    if (this.formularioEditar.value.Fecha === '') {
      this.fechaInicio = this.obtenerFecha(articulo.Fecha).time;
    } else {
      this.fechaInicio = new Date(this.formularioEditar.value.Fecha);
    }

    this.estado = this.formularioEditar.value.Estado;
    if (this.estado === '') {
      this.estado = articulo.Estado;
    }

    if (this.formularioEditar.value.FechaFin === '') {
      if(articulo.FechaFin){this.fechaFin = this.obtenerFecha(articulo.FechaFin).time;}
    } else {
      this.fechaFin = new Date(this.formularioEditar.value.FechaFin);
    }

    if(this.esFechaFin && this.formularioEditar.value.FechaFin !== ''){

      this.database.doc('articulos/' + this.idArticulo).update({
        Articulo: this.articulo,
        Cantidad: this.cantidad,
        Precio: this.precio,
        Edificio: this.edificio,
        Codigo: this.codigo,
        Fecha: this.fechaInicio,
        Descripcion: this.descripcion,
        Foto: this.imagen,
        Institucion: this.institucion,
        Estado: this.estado,
        FechaFin: this.fechaFin
      }).then(() => {
        this.mensajeServicio.exito('Actualizado','Articulo ha sido actualizado con exito');
        this.router.navigate(['/articuloDetalle', this.idArticulo]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/articuloDetalle', this.idArticulo]);
      });
    } else {
      this.database.doc('articulos/' + this.idArticulo).update({
        Articulo: this.articulo,
        Cantidad: this.cantidad,
        Precio: this.precio,
        Edificio: this.edificio,
        Codigo: this.codigo,
        Fecha: this.fechaInicio,
        Descripcion: this.descripcion,
        Foto: this.imagen,
        Institucion: this.institucion,
        Estado: this.estado
      }).then(() => {
        this.mensajeServicio.exito('Actualizado','Articulo ha sido actualizado con exito');
        this.router.navigate(['/articuloDetalle', this.idArticulo]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/articuloDetalle', this.idArticulo]);
      });
    }
  }
}
