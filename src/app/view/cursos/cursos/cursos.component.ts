import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  formularioBuscar: FormGroup;
  estado: string;
  presentacion: boolean;

  constructor(
    private cursoServicio: CursoService,
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
    this.cursos = this.cursoServicio.verCursos();
    this.estados = this.estadoServicio.verEstados();
    this.estado = '01';
    this.presentacion = true;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
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

  listadoCursoPDF() {

    const doc = new jsPDF('portrait', 'px', 'a4');
    let aulas = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();

    titulos = ['#' , 'CURSO' , 'CODIGO' , 'DURACION', 'ESTADO' ];

    this.filtrarCursos().forEach( curso => {
      this.estados.forEach( estado => {
        if (estado.id === curso.Estado) {
          ids.push(curso.id);
          aulas.push([
            ids.indexOf(curso.id) + 1,
            curso.Descripcion.toUpperCase(),
            curso.Codigo.toUpperCase(),
            this.cantidadSemana(curso.Tiempo),
            estado.descripcion.toUpperCase()
          ]);
        }
      });
    });


    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Cursos Encontrados');

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
    doc.save('CursosEncontradas.pdf');

  }

  cambiarPresentacion(){
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }
  }

  filtrarCursos(){
    let cadena = this.formularioBuscar.value.Curso.toLowerCase();
    let cursos = new Array<any>();

    if(cadena !== '') {

      this.cursos.forEach(data => {
        let info = data.Descripcion.toLowerCase();
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          if(info.indexOf(cadena,0)===0){
            cursos.push(data);
          }
        }
      });

    }else{
      this.cursos.forEach(data => {
        if(data.Estado == this.estado && data.Institucion == this.institucion){
          cursos.push(data);
        }

      });
    }

    return cursos;
  }

  tenerEstadosCursos(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '07') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Curso: ['']
    });
  }

}
