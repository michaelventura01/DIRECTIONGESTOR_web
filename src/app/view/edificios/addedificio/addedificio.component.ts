import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addedificio',
  templateUrl: './addedificio.component.html',
  styleUrls: ['./addedificio.component.css']
})
export class AddedificioComponent implements OnInit {

  paises: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  instituto: string;
  imagen: string;
  esImagen: boolean;
  carga: number;
  esCarga: boolean;
  formularioEdificio: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private database: AngularFirestore,
    private storage: AngularFireStorage,
    private mensajeServicio:MensajeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.paises = this.direccionServicio.verPaises();
    this.instituto = localStorage.getItem('instituto');
    this.carga = 0;
    this.esCarga = false;
  }

  tenerCiudades(data){
    this.ciudades = new Array<any>();
    this.ciudades = this.direccionServicio.verCiudades(data);
  }

  agregarEdificio(){
    if(!this.esImagen){this.imagen = '';}

    this.database.collection('edificios').add(
      {
        Ciudad:this.formularioEdificio.value.Ciudad,
        Direccion: this.formularioEdificio.value.Direccion,
        Estado: "01",
        Institucion: this.instituto,
        Nombre: this.formularioEdificio.value.Descripcion,
        Pais:this.formularioEdificio.value.Pais,
        Foto: this.imagen
      }).then(()=>{
      this.mensajeServicio.exito('Guardado','Edificio ha sido agregada con exito');
      this.router.navigate(['/edificios']);

    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/edificios']);

    });
  }

  subirImagen(event){
    if(event.target.files.length>0){

      const file = event.target.files[0];
      let archivo = new Date().getTime().toString();
      let tipoArchivo = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'edificios/'+archivo+tipoArchivo;
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
    this.formularioEdificio = this.formBuilder.group(
      {
        Descripcion: ['',Validators.compose([Validators.required])],
        Pais: ['',Validators.compose([Validators.required])],
        Ciudad: ['',Validators.compose([Validators.required])],
        Foto: [""],
        Direccion  : ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_./# +-]+,[a-zA-Z0-9_.# +-]+$')])]
      }
    );
  }

}
