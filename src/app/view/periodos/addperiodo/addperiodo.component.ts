import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addperiodo',
  templateUrl: './addperiodo.component.html',
  styleUrls: ['./addperiodo.component.css']
})
export class AddperiodoComponent implements OnInit {
  formularioCreado: FormGroup;
  periodos: Array<any> = new Array<any>();
  tiempo: number;
  periodo: string;
  fechaInicio: Date;
  fechaFin: Date;
  institucion: string;
  codigo: string;

  constructor(
    private formBuilder: FormBuilder,
    private periodoServicio: PeriodoService,
    private router: Router,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore ) { }

  ngOnInit() {
    this.crearFormulario();
    this.tiempo = 0;
    this.institucion = localStorage.getItem('instituto');
    this.periodos = this.periodoServicio.verPeriodos();


  }

  buscarCursos(){
    let periodo: any;
    this.codigo = this.formularioCreado.value.Codigo;

    this.periodos.forEach( data=>{
      if(data.Codigo.toLowerCase() == this.codigo.toLowerCase() && data.Institucion == this.institucion){
        periodo =data
      }
    });

    return periodo;

  }

  guardarPeriodo(periodo){

    this.periodo = this.formularioCreado.value.Descripcion;
    this.fechaInicio = new Date(this.formularioCreado.value.Inicio);
    this.fechaFin = new Date(this.formularioCreado.value.Fin);
    this.codigo = this.formularioCreado.value.Codigo;


    if(this.tiempo>-1){
      if(!periodo){
        this.database.collection('periodos').add({
          Descripcion: this.periodo,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          Institucion: this.institucion,
          Estado: '01',
          Codigo: this.codigo
        }).then(()=>{
          this.mensajeServicio.exito('Guardado','Periodo ha sido agregado con exito');
          this.router.navigate(['/periodos']);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/periodos']);
        });
      }else{
        this.mensajeServicio.info('Registro Existente','Un Registro con Este Codigo fue Agregado Anteriormente');
        this.router.navigate(['/periodos']);
      }


    }



  }

  tenerCantidadSemanas(){
    let tiempoA: Date;
    let tiempoB: Date;
    let semanaTotal: number = 0;

    if(this.formularioCreado.value.Inicio.toString()!== '' && this.formularioCreado.value.Fin.toString()!== ''){

      tiempoA = new Date(this.formularioCreado.value.Inicio.toString());
      tiempoB = new Date(this.formularioCreado.value.Fin.toString());
      semanaTotal = Math.round(Math.round( (tiempoB.getTime() - tiempoA.getTime()) / (1000*60*60*24) )/7);

    }

    this.tiempo = semanaTotal;

    return semanaTotal;
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Descripcion : ['', Validators.compose([Validators.required])],
      Codigo: ['', Validators.compose([Validators.required])],
      Inicio : ['', Validators.compose([Validators.required])],
      Fin : ['', Validators.compose([Validators.required])],
      Tiempo: [{value:'', disabled: true}]
    });
  }

}
