
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdificioService } from 'src/app/services/edificio.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editaula',
  templateUrl: './editaula.component.html',
  styleUrls: ['./editaula.component.css']
})
export class EditaulaComponent implements OnInit {
  idAula: string;
  usuario: string;
  paises: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  formularioEditar: FormGroup;
  esEstado: boolean;
  esEdificio: boolean;
  institucion: string;
  estado: string;
  edificio: string;
  descripcion: string;


  constructor(
    private ruta: ActivatedRoute,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore,
    private personaServicio: PersonaService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.editarFormulario();
    this.idAula = this.ruta.snapshot.params['id'],
    this.usuario = localStorage.getItem('usuario');
    this.institucion = localStorage.getItem('instituto');
    this.paises  = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.estados = this.estadoServicio.verEstados();
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
    this.esEdificio = false;
    this.esEstado = false;
  }

  cambiarEdificio(){
    this.esEdificio = true;
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  editarAula(aula){
    this.spinner.show();

    let hoy = new Date();
    this.descripcion = this.formularioEditar.value.Aula;
    this.estado = this.formularioEditar.value.Estado;
    this.edificio = this.formularioEditar.value.Edificio;

    if(this.descripcion == ''){
      this.descripcion = aula.Descripcion;
    }
    if(this.estado == ''){
      this.estado = aula.Estado;
    }
    if(this.edificio == ''){
      this.edificio = aula.Edificio;
    }

    this.database.doc('aulas/'+this.idAula).update({
      Descripcion: this.descripcion,
      Edificio: this.edificio,
      Estado: this.estado,
      Institucion: this.institucion,
      FechaAgregacion: this.obtenerFecha(aula.FechaAgregacion).time,
      FechaModificacion: hoy
    }).then(()=>{
      this.spinner.hide();
      this.mensajeServicio.exito('Actualizado','Aula ha sido actualizada con exito');
      this.router.navigate(['/aulaDetalle', this.idAula]);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/aulaDetalle', this.idAula]);
    });
  }

  tenerEdificio(aula){
    let edificio: any;
    this.edificios.forEach(data=>{
      if(aula.Edificio === data.id){
        edificio = data;
      }
    });
    return edificio;
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerEstado(aula){
    let estado: any;
    this.estados.forEach(data=>{
      if(aula.Estado === data.id){
        estado = data;
      }
    });
    return estado;
  }

  tenerEdificios(){
    let edificios: Array<any> = new Array<any>();
    this.edificios.forEach(data=>{
      if( this.institucion === data.Institucion){
        edificios.push(data);
      }
    });
    return edificios;
  }

  tenerAula(){
    let aulas: Array<any> = new Array<any>();
    this.aulas.forEach(data=>{
      if( this.idAula === data.id){
        aulas.push(data);
      }
    });
    return aulas;
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

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group({
      Aula:[''],
      Edificio:[''],
      Estado:['']
    });

  }


}
