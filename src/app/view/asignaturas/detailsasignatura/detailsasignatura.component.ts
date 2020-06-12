import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { PersonaService } from 'src/app/services/persona.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-detailsasignatura',
  templateUrl: './detailsasignatura.component.html',
  styleUrls: ['./detailsasignatura.component.css']
})
export class DetailsasignaturaComponent implements OnInit {

  idAsignatura: string;
  estados: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();

  constructor(
    private estadoServicio: EstadoService,
    private asignaturaServicio: AsignaturaService,
    private ruta: ActivatedRoute,
    private personaServicio: PersonaService,
    private spinner: NgxSpinnerService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router

  ) { }

  ngOnInit() {
    this.spinner.show();
    this.idAsignatura = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);

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

  imprimirAsignaturaPDF(asignatura){

    let hoy = new Date();
    let observation: string;

    let doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(100);
    doc.text(35, 20, 'Ficha de  Asignatura');

    doc.setFontSize(12);
    doc.setTextColor(130);
    doc.text(360, 20, hoy.getDate() + ' / ' + (hoy.getMonth() + 1) + ' / ' + hoy.getFullYear());

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);

    doc.setTextColor(100);
    doc.setFontSize(13);
    doc.text(35, 60, 'Nombre:');
    doc.text(250, 60, 'Codigo:');
    doc.text(35, 150, 'Duracion:');
    doc.text(250, 150, 'Estado del Asignatura:');

    doc.setTextColor(60);
    doc.setFontSize(14);
    doc.text(35, 75, asignatura.Descripcion.toUpperCase());
    doc.text(250, 75, asignatura.Codigo.toUpperCase());
    doc.text(35, 165, this.cantidadSemana(asignatura.Tiempo).toUpperCase());


    this.estados.forEach(estado => {
      if(estado.id === asignatura.Estado){
        doc.text(250, 165, estado.descripcion.toUpperCase());
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
   doc.save( 'Ficha de Asignatura');

  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  eliminarAsignatura(asignatura){

    this.spinner.show();
    let hoy = new Date();

    this.database.doc('asignaturas/'+this.idAsignatura).update({
      Descripcion:asignatura.Descripcion,
      Codigo: asignatura.Codigo,
      Estado: '',
      Institucion: asignatura.Institucion,
      Tiempo: asignatura.Tiempo,
      FechaAgregacion: this.obtenerFecha(asignatura.FechaAgregacion).time,
      FechaEdicion: hoy

    }).then(()=>{
      this.spinner.hide();
      this.mensajeServicio.exito('Eliminado','Asignatura ha sido eliminada con exito');
      this.router.navigate(['/asignaturas']);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/asignaturas']);
    });

    this.spinner.hide();

  }

}
