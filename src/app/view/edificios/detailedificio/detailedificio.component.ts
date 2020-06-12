import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EdificioService } from 'src/app/services/edificio.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EstadoService } from 'src/app/services/estado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PersonaService } from 'src/app/services/persona.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-detailedificio',
  templateUrl: './detailedificio.component.html',
  styleUrls: ['./detailedificio.component.css']
})
export class DetailedificioComponent implements OnInit {
  idEdificio: string;
  edificios: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();


  constructor(
    private ruta: ActivatedRoute,
    private edificioServicio: EdificioService,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private spinner: NgxSpinnerService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router,
    private personaServicio: PersonaService
    ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.idEdificio = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.edificios = this.edificioServicio.verEdificios();
  }

  tenerEdificios(){
    let edificios: Array<any> = new Array<any>();
    this.edificios.forEach(data => {
      if(this.idEdificio === data.id){
        edificios.push(data);
      }
    });

    return edificios;
  }

  imprimirEdificioPDF(edificio){

    let hoy = new Date();
    let observation: string;

    let doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(100);
    doc.text(35, 20, 'Ficha de  Edificio');

    doc.setFontSize(12);
    doc.setTextColor(130);
    doc.text(360, 20, hoy.getDate() + ' / ' + (hoy.getMonth() + 1) + ' / ' + hoy.getFullYear());

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);

    doc.setTextColor(100);
    doc.setFontSize(13);
    doc.text(35, 60, 'Nombre:');
    doc.text(35, 150, 'Direccion:');
    doc.text(250, 150, 'Ciudad:');
    doc.text(35, 240, 'Pais:');
    doc.text(250, 240, 'Estado del Edificio:');

    doc.setTextColor(60);
    doc.setFontSize(14);
    doc.text(35, 75, edificio.Nombre.toUpperCase());


    doc.text(35, 165, edificio.Direccion.toUpperCase());


    this.ciudades.forEach( ciudad => {
      if(ciudad.id === edificio.Ciudad){
        doc.text(250, 165, ciudad.descripcion.toUpperCase());
      }
    });
    this.paises.forEach( pais => {
      if(pais.id === edificio.Pais){
        doc.text(35, 255, pais.descripcion.toUpperCase());
      }
    });
    this.estados.forEach(estado => {
      if(estado.id === edificio.Estado){
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
   doc.save( 'Ficha de Edificio');

  }

  eliminarEdificio(edificio){
    this.spinner.show();
    let fecha = new Date();
    this.database.doc('edificios/' + this.idEdificio).update({
      Ciudad : edificio.Ciudad,
      Direccion: edificio.Direccion,
      Estado: '',
      Foto: edificio.Foto,
      Institucion: edificio.Institucion,
      Nombre: edificio.Nombre,
      Pais: edificio.Pais,
      FechaAgregacion: this.obtenerFecha(edificio.FechaAgregacion).time,
      FechaModificacion: fecha
    }).then(() => {
      this.spinner.hide();
      this.mensajeServicio.exito('Eliminado', 'Edificio ha sido eliminada con exito');
      this.router.navigate(['/edificios']);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      this.router.navigate(['/edificios']);
    });

  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

}
