import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  asignaturas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  formularioBuscar: FormGroup;
  estado: string;
  presentacion: boolean;

  constructor(
    private asignaturaServicio: AsignaturaService,
    private estadoServicio: EstadoService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.estados = this.estadoServicio.verEstados();
    this.estado = '01';
    this.presentacion = true;
  }

  listadoAsignaturaPDF(){
    const doc = new jsPDF('portrait', 'px', 'a4');
    let aulas = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();

    titulos = ['#' , 'ASIGNATURA' , 'CODIGO' , 'DURACION', 'ESTADO' ];

    this.filtrarAsignaturas().forEach( asignatura => {
      this.estados.forEach( estado => {
        if (estado.id === asignatura.Estado) {
          ids.push(asignatura.id);
          aulas.push([
            ids.indexOf(asignatura.id) + 1,
            asignatura.Descripcion.toUpperCase(),
            asignatura.Codigo.toUpperCase(),
            this.cantidadSemana(asignatura.Tiempo),
            estado.descripcion.toUpperCase()
          ]);
        }
      });
    });


    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Asignaturas Encontrados');

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
    doc.save('Asignaturas Encontradas.pdf');

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

  cambiarPresentacion(){
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  filtrarAsignaturas(){
    let cadena = this.formularioBuscar.value.Asignatura.toLowerCase();
    let asignaturas = new Array<any>();

    if(cadena !== '') {

      this.asignaturas.forEach(data => {
        let info = data.Descripcion.toLowerCase();
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          if(info.indexOf(cadena,0)===0){
            asignaturas.push(data);
          }
        }
      });

    }else{
      this.asignaturas.forEach(data => {
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          asignaturas.push(data);
        }

      });
    }

    return asignaturas;
  }

  tenerEstadosAsignaturas(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '05') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Asignatura: ['']
    });
  }

}
