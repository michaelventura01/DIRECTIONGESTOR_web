import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { EdificioService } from 'src/app/services/edificio.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addArticulo',
  templateUrl: './addArticulo.component.html',
  styleUrls: ['./addArticulo.component.css']
})
export class AddArticuloComponent implements OnInit {
  articulo: string;
  codigo: string;
  cantidad: number;
  precio: number;
  fechaInicio: Date;
  formularioCreado: FormGroup;
  imagen: string;
  esImagen: boolean;
  carga: number;
  esCarga: boolean;
  edificios: Array<any> = new Array<any>();
  articulos: Array<any> = new Array<any>();
  institucion: string;
  edificio: string;
  descripcion: string;

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private mensajeServicio: MensajeService,
    private router: Router,
    private edificioServicio: EdificioService,
    private articuloServicio: ArticuloService) { }

  ngOnInit() {
    this.crearFormulario();
    this.carga = 0;
    this.esCarga = false;
    this.esImagen = false;
    this.institucion = localStorage.getItem('instituto');
    this.edificios = this.edificioServicio.verEdificios();
    this.articulos = this.articuloServicio.verArticulos();
    this.imagen = '';
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

  buscarArticulo(){
    let articulo: any;
    this.codigo = this.formularioCreado.value.Codigo;
    this.articulos.forEach( data=>{
      if(data.Codigo == this.codigo.toLowerCase() && data.Institucion == this.institucion){
        articulo =data
      }
    });
    return articulo;
  }

  subirImagen(event){
    if(event.target.files.length>0){

      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'articulos/'+archivo+tipoArchivo;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(file);
      tarea.then((resultado)=>{

        this.carga = 0;

      });

      tarea.percentageChanges().subscribe(respuesta => {
        this.esCarga = true;
        this.carga = parseInt(respuesta.toString());
        referencia.getDownloadURL().subscribe(resultado => {
          this.imagen = resultado;
          this.esImagen = true;
          this.esCarga = false;
        });
      });


    }
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Articulo: ['', Validators.compose([Validators.required])],
      Cantidad: ['', Validators.compose([Validators.required])],
      Precio: ['', Validators.compose([Validators.required])],
      Edificio: ['', Validators.compose([Validators.required])],
      Codigo: ['', Validators.compose([Validators.required])],
      Fecha: ['', Validators.compose([Validators.required])],
      Descripcion: ['', Validators.compose([Validators.required])],
      Foto: ['']
    }
    );

  }

  agregarArticulo(articuloAnterior)
  {
    this.edificio = this.formularioCreado.value.Edificio;
    this.descripcion = this.formularioCreado.value.Descripcion;
    this.articulo = this.formularioCreado.value.Articulo;
    this.precio = this.formularioCreado.value.Precio * 1;
    this.cantidad = this.formularioCreado.value.Cantidad * 1;
    this.codigo = this.formularioCreado.value.Codigo.toLowerCase();
    this.fechaInicio = new Date(this.formularioCreado.value.Fecha);

    if(!articuloAnterior){
      this.database.collection('articulos').add(
        {
          Articulo: this.articulo,
          Cantidad: this.cantidad,
          Precio: this.precio,
          Edificio: this.edificio,
          Codigo: this.codigo,
          Fecha: this.fechaInicio,
          Descripcion: this.descripcion,
          Foto: this.imagen,
          Institucion: this.institucion,
          Estado: '01'

        }).then(()=>{
        this.mensajeServicio.exito('Guardado','Articulo ha sido agregado con exito');
        this.router.navigate(['/articulos']);

      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/articulos']);
      });
    }else{
      this.mensajeServicio.info('Registro Existente','Un Articulo con este Codigo fue Registrado Anteriormente');
      this.router.navigate(['/articulos']);
    }



  }

}
