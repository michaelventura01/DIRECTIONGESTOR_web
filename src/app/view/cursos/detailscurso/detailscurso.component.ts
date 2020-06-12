import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { CursoService } from 'src/app/services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PersonaService } from 'src/app/services/persona.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-detailscurso',
  templateUrl: './detailscurso.component.html',
  styleUrls: ['./detailscurso.component.css']
})
export class DetailscursoComponent implements OnInit {

  idCurso: string;
  estados: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();

  constructor(
    private estadoServicio: EstadoService,
    private cursoServicio: CursoService,
    private ruta: ActivatedRoute,
    private database: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService,
    private mensajeServicio: MensajeService,
    private personaServicio: PersonaService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.idCurso = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.cursos = this.cursoServicio.verCursos();

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

  imprimirCursoPDF(curso){


    let hoy = new Date();
    let observation: string;

    let doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(100);
    doc.text(35, 20, 'Ficha de  Curso');

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
    doc.text(250, 150, 'Estado del Curso:');

    doc.setTextColor(60);
    doc.setFontSize(14);
    doc.text(35, 75, curso.Descripcion.toUpperCase());
    doc.text(250, 75, curso.Codigo.toUpperCase());
    doc.text(35, 165, this.cantidadSemana(curso.Tiempo).toUpperCase());


    this.estados.forEach(estado => {
      if(estado.id === curso.Estado){
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
   doc.save( 'Ficha de Curso');


  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  eliminarCurso(curso){
    this.spinner.show();

    let hoy = new Date();

    this.database.doc('cursos/'+this.idCurso).update({
      Descripcion:curso.Descripcion,
      Codigo: curso.Codigo,
      Estado: '',
      Institucion: curso.Institucion,
      Tiempo: curso.Tiempo,
      FechaAgregacion: this.obtenerFecha(curso.FechaAgregacion).date,
      FechaEdicion: hoy

    }).then(()=>{
      this.spinner.hide();
      this.mensajeServicio.exito('Eliminado','Curso ha sido eliminado con exito');
      this.router.navigate(['/cursos']);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/cursos']);
    });

  }

}
