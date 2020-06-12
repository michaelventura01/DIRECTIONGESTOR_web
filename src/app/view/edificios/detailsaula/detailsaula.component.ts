import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EdificioService } from 'src/app/services/edificio.service';
import {PersonaService} from 'src/app/services/persona.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detailsaula',
  templateUrl: './detailsaula.component.html',
  styleUrls: ['./detailsaula.component.css']
})
export class DetailsaulaComponent implements OnInit {

  idAula: string;
  usuario: string;
  paises: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();


  constructor(
    private ruta: ActivatedRoute,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private spinner: NgxSpinnerService,
    private database: AngularFirestore,
    private edificioServicio: EdificioService,
    private personaServicio: PersonaService,
    private mensajeServicio: MensajeService,
    private router: Router

  ) {

  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.idAula = this.ruta.snapshot.params['id'],
    this.usuario = localStorage.getItem('usuario');
    this.paises  = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.estados = this.estadoServicio.verEstados();
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
  }

  imprimirAulaPDF(aula){

    let hoy = new Date();
    let observation: string;

    let doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(100);
    doc.text(35, 20, 'Ficha de  Aula');

    doc.setFontSize(12);
    doc.setTextColor(130);
    doc.text(360, 20, hoy.getDate() + ' / ' + (hoy.getMonth() + 1) + ' / ' + hoy.getFullYear());

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);

    doc.setTextColor(100);
    doc.setFontSize(13);
    doc.text(35, 60, 'Aula:');
    doc.text(250, 60, 'Edificio:');
    doc.text(35, 150, 'Direccion:');
    doc.text(250, 150, 'Ciudad:');
    doc.text(35, 240, 'Pais:');
    doc.text(250, 240, 'Estado del Aula:');

    doc.setTextColor(60);
    doc.setFontSize(14);
    doc.text(35, 75, aula.Descripcion.toUpperCase());
    this.edificios.forEach( edificio => {
      if(edificio.id === aula.Edificio){
        doc.text(250, 75, edificio.Nombre.toUpperCase());
      }
    });
    this.edificios.forEach( edificio => {
      if(edificio.id === aula.Edificio){
        doc.text(35, 165, edificio.Direccion.toUpperCase());
      }
    });
    this.edificios.forEach( edificio => {
      if(edificio.id === aula.Edificio){
        this.ciudades.forEach( ciudad => {
          if(ciudad.id === edificio.Ciudad){
            doc.text(250, 165, ciudad.descripcion.toUpperCase());
          }
        });
      }
    });
    this.edificios.forEach( edificio => {
      if(edificio.id === aula.Edificio){
        this.paises.forEach( pais => {
          if(pais.id === edificio.Pais){
            doc.text(35, 255, pais.descripcion.toUpperCase());
          }
        });
      }
    });
    this.estados.forEach(estado => {
      if(estado.id === aula.Estado){
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
   doc.save( 'Ficha de Aula');

  }

  eliminarAula(aula) {
    this.spinner.show();
    let fecha = new Date();
    this.database.doc('aulas/' + this.idAula).update({
      Descripcion: aula.Descripcion,
      Edificio: aula.Edificio,
      Estado: '',
      Institucion: aula.Institucion,
      FechaAgregacion: this.obtenerFecha(aula.FechaAgregacion).time,
      FechaModificacion: fecha
    }).then(() => {
      this.spinner.hide();
      this.mensajeServicio.exito('Eliminado', 'Aula ha sido eliminada con exito');
      this.router.navigate(['/aulas']);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      this.router.navigate(['/aulas']);
    });

  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerEdificio(aula){
    let edificio: any ;

    this.edificios.forEach(data=>{
      if(aula.Edificio === data.id){
        edificio = data;
      }
    });
    if(!edificio){
      edificio = { Foto: ''};
    }
    return edificio;
  }

}
