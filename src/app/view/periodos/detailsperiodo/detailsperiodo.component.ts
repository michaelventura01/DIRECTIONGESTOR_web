import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeriodoService } from 'src/app/services/periodo.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-detailsperiodo',
  templateUrl: './detailsperiodo.component.html',
  styleUrls: ['./detailsperiodo.component.css']
})
export class DetailsperiodoComponent implements OnInit {

  periodos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioBuscar: FormGroup;
  institucion: string;
  idPeriodo: string;

  constructor(
    private periodoServicio: PeriodoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private ruta: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.idPeriodo = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.periodos = this.periodoServicio.verPeriodos();
  }

  eliminarPeriodo(periodo) {
    this.spinner.show();
    let hoy = new Date();
    this.database.doc('periodos/' + this.idPeriodo).update({
      Descripcion: periodo.Descripcion,
      fechaInicio: this.obtenerFecha(periodo.fechaInicio).time,
      fechaFin: this.obtenerFecha(periodo.fechaFin).time,
      Institucion: periodo.Institucion,
      Estado: '',
      Codigo: periodo.Codigo,
      FechaAgregacion: this.obtenerFecha(periodo.FechaAgregacion).time,
      FechaEdicion: hoy
    }).then(() => {
      this.spinner.hide();
      this.mensajeServicio.exito('Eliminado','Periodo ha sido eliminado con exito');
      this.router.navigate(['/periodos']);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/periodos']);
    });
  }

  cantidadSemanas(periodo){
    let semanas = this.tenerSemanas(this.obtenerFecha(periodo.fechaInicio).date,this.obtenerFecha(periodo.fechaFin).date);
    let cantidad: string;
    if(semanas>1){
      cantidad = semanas.toString() + ' SEMANAS';
    } else {
      cantidad = semanas.toString() + ' SEMANA';
    }
    return cantidad;
  }

  imprimirPeriodoPDF(periodo){


    let hoy = new Date();
    let observation: string;

    let doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(100);
    doc.text(35, 20, 'Ficha de  Periodo');

    doc.setFontSize(12);
    doc.setTextColor(130);
    doc.text(360, 20, hoy.getDate() + ' / ' + (hoy.getMonth() + 1) + ' / ' + hoy.getFullYear());

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);

    doc.setTextColor(100);
    doc.setFontSize(13);
    doc.text(35, 60, 'Descripcion:');
    doc.text(250, 60, 'Codigo:');
    doc.text(35, 150, 'Duracion:');
    doc.text(250, 150, 'Inicio:');
    doc.text(35, 240, 'Finalizacion:');
    doc.text(250, 240, 'Estado del Curso:');

    doc.setTextColor(60);
    doc.setFontSize(14);
    doc.text(35, 75, periodo.Descripcion.toUpperCase());
    doc.text(250, 75, periodo.Codigo.toUpperCase());
    doc.text(35, 165, this.cantidadSemanas(periodo));
    doc.text(250, 165, this.obtenerFecha(periodo.fechaInicio).fechaNacimiento.toUpperCase());
    doc.text(35, 255, this.obtenerFecha(periodo.fechaFin).fechaNacimiento.toUpperCase());
     this.estados.forEach(estado => {
      if(estado.id === periodo.Estado){
        doc.text(250, 255, estado.descripcion.toUpperCase());
      }
    });

   doc.setTextColor(150);
   doc.setFontSize(8);
   doc.setLineWidth(0.5);
   doc.line(15, 610, 430, 610);
   doc.text(35, 620, localStorage.getItem('tituloFooter').toUpperCase());
   doc.text(385, 620, 'Direction Gestor');

   doc.output('dataurlnewwindow');

   // Save the PDF
   doc.save( 'Ficha de Periodo');


  }

  cantidadSemana(cantidad){
    let semanas: string;
    if(cantidad>1){
      semanas = cantidad + ' SEMANAS'
    } else {
      semanas = cantidad + ' SEMANA'
    }

    return semanas
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerSemanas(fechaInicio, fechaFin){
    let tiempoA: Date;
    let tiempoB: Date;
    let semanaTotal: number = 0;

    if(fechaInicio!== '' && fechaFin!== ''){

      tiempoA = new Date(fechaInicio);
      tiempoB = new Date(fechaFin);
      semanaTotal = Math.round(Math.round( (tiempoB.getTime() - tiempoA.getTime()) / (1000*60*60*24) )/7);

    }

    return semanaTotal;
  }


}
