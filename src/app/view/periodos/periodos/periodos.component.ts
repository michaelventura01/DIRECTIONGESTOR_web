import { Component, OnInit } from '@angular/core';
import { PeriodoService } from 'src/app/services/periodo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
  periodos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  estado: string;
  formularioBuscar: FormGroup;
  institucion: string;
  presentacion: boolean;

  constructor(
    private periodoServicio: PeriodoService,
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.periodos = this.periodoServicio.verPeriodos();
    this.estados = this.estadoServicio.verEstados();
    this.estado = '01';
    this.presentacion = true;
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  listadoPeriodoPDF(periodo){

    const doc = new jsPDF('portrait', 'px', 'a4');
    let aulas = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();

    titulos = ['#' , 'PERIODO' , 'INICIO' , 'FIN', 'ESTADO' ];

    this.filtrarPeriodo().forEach( periodo => {
      this.estados.forEach( estado => {
        if (estado.id === periodo.Estado) {
          ids.push(periodo.id);
          aulas.push([
            ids.indexOf(periodo.id) + 1,
            periodo.Descripcion.toUpperCase(),
            this.obtenerFecha(periodo.fechaInicio).fechaNacimiento.toUpperCase(),
            this.obtenerFecha(periodo.fechaFin).fechaNacimiento.toUpperCase(),
            estado.descripcion.toUpperCase()
          ]);
        }
      });
    });


    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Periodos Encontrados');

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);
    (doc as any).autoTable({
      head: [titulos],
      body: aulas,
      theme: 'striped'
    });


    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.setLineWidth(0.5);
    doc.line(15, 610, 430, 610);
    doc.text(35, 620, localStorage.getItem('tituloFooter').toUpperCase());
    doc.text(385, 620, 'Direction Gestor');


    // Open PDF document in new tab
    doc.output('dataurlnewwindow');

    // Save the PDF
    doc.save('Periodos Encontradas.pdf');

  }

  cambiarPresentacion(){
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }
  }




  filtrarPeriodo(){
    let cadena = this.formularioBuscar.value.Periodo.toLowerCase();
    let periodos = new Array<any>();
    if(cadena !== '') {
      this.periodos.forEach(data => {
        let info = data.Descripcion.toLowerCase();
        if(data.Institucion == this.institucion && data.Estado == this.estado){
          if(info.indexOf(cadena,0)===0 ){
            periodos.push(data);
          }
        }
      });
    }else{
      this.periodos.forEach(data => {
        if(data.Institucion == this.institucion && data.Estado == this.estado){
          periodos.push(data);
        }
      });
    }

    return periodos;
  }

  tenerSoloEstado(){
    this.estado = this.formularioBuscar.value.Estado;
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



 buscarFormulario(){
  this.formularioBuscar = this.formBuilder.group({
    Periodo: [''],
    Estado: ['']
  });
}

}
