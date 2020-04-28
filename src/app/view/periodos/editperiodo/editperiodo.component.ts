import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-editperiodo',
  templateUrl: './editperiodo.component.html',
  styleUrls: ['./editperiodo.component.css']
})
export class EditperiodoComponent implements OnInit {
  formularioEditar: FormGroup;
  tiempo: number;
  idPeriodo: string;
  institucion: string;
  fechaInicio: Date;
  esFechaInicio: boolean
  fechaFin: Date
  esFechaFin: boolean;
  periodo: string;
  esPeriodo: boolean;
  codigo: string;
  esCodigo: boolean;
  estado: string;
  esEstado: boolean;
  esRango: boolean;
  esGuardar: boolean;
  periodos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ruta:ActivatedRoute,
    private periodoServicio: PeriodoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.tiempo = 0;
    this.idPeriodo = this.ruta.snapshot.params['id'];
    this.institucion = localStorage.getItem('instituto');
    this.estados = this.estadoServicio.verEstados();
    this.periodos = this.periodoServicio.verPeriodos();
    this.esEstado = false;
    this.esRango = false;

  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerCantidadSemanas(periodo){
    let tiempoA: Date;
    let tiempoB: Date;
    let semanaTotal: number = 0;

    if(this.esRango){
      if(this.formularioEditar.value.Inicio.toString()!== '' && this.formularioEditar.value.Fin.toString()!== ''){
        tiempoA = new Date(this.formularioEditar.value.Inicio.toString());
        tiempoB = new Date(this.formularioEditar.value.Fin.toString());
        semanaTotal = Math.round(Math.round( (tiempoB.getTime() - tiempoA.getTime()) / (1000*60*60*24) )/7);
      }
    }else{
      if(this.obtenerFecha(this.formularioEditar.value.Inicio).fecha !== '' && this.obtenerFecha(this.formularioEditar.value.Fin).fecha!== ''){
        tiempoA = new Date(this.obtenerFecha(periodo.fechaInicio).fecha);
        tiempoB = new Date(this.obtenerFecha(periodo.fechaFin).fecha);
        semanaTotal = Math.round(Math.round( (tiempoB.getTime() - tiempoA.getTime()) / (1000*60*60*24) )/7);
      }
    }


    this.tiempo = semanaTotal;

    return semanaTotal;
  }

  tenerSoloEstado(){
    this.estado = this.formularioEditar.value.Estado;
  }

  cambiarRango(){
    this.esRango = true;
  }


  cambiarEstado(){
    this.esEstado = true;
  }

  tenerEstadosPeriodos(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00') {
        state.push(dato);
      }
    });
    return state;

  }

  editarPeriodo(periodo){

    this.periodo = this.formularioEditar.value.Descripcion;
    this.codigo  = periodo.Codigo;
    this.estado = this.formularioEditar.value.Estado;

    if(this.periodo==""){this.periodo = periodo.Descripcion;}
    if(this.estado ==""){this.estado  = periodo.Estado;}
    if (this.formularioEditar.value.Inicio === '') {
      this.fechaInicio = this.obtenerFecha(periodo.fechaInicio).time;
    } else {
      this.fechaInicio = new Date(this.formularioEditar.value.Inicio);
    }

    if (this.formularioEditar.value.Fin === '') {
      this.fechaFin = this.obtenerFecha(periodo.fechaFin).time;
    } else {
      this.fechaFin = new Date(this.formularioEditar.value.Fin);
    }



    this.database.doc('periodos/' + this.idPeriodo).update({
      Descripcion: this.periodo,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      Institucion: this.institucion,
      Estado: this.estado,
      Codigo: this.codigo
    }).then(() => {
      this.mensajeServicio.exito('Actualizado','Periodo ha sido actualizada con exito');
      this.router.navigate(['/periodoDetalle', this.idPeriodo]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/periodoDetalle', this.idPeriodo]);
    });



  }

  crearFormulario(){
    this.formularioEditar = this.formBuilder.group(
    {
      Descripcion : [''],
      Estado : [''],
      Inicio : [''],
      Fin : [''],
      Tiempo: [{value:'', disabled:true}],
      Codigo:[{value:'', disabled:true}]
    });
  }

}
