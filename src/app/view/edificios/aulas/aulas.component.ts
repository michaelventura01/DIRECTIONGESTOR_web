import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  institucion:string;
  estado: string;
  edificio: string;
  presentacion: boolean;
  formularioBuscar: FormGroup;

  constructor(
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.buscarFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.edificio = '';
    this.estado = '01';
    this.presentacion = true;
  }

  listadoAulaPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');
    let aulas = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();

    titulos = ['#' , 'AULA' , 'EDIFICIO' , 'DIRECCION', 'ESTADO' ];

    this.filtrarAulas().forEach( aula => {
      this.edificios.forEach( edificio => {
        if (aula.Edificio === edificio.id) {
          this.estados.forEach( estado => {
            if (estado.id === aula.Estado) {
              ids.push(aula.id);
              aulas.push([
                ids.indexOf(aula.id) + 1,
                aula.Descripcion.toUpperCase(),
                edificio.Nombre.toUpperCase(),
                edificio.Direccion.toUpperCase(),
                estado.descripcion.toUpperCase()
              ]);
            }
          });
        }
      });
    });


    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Aulas Encontradas');

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
    doc.save('AulasEncontradas.pdf');

  }

  cambiarPresentacion() {
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }
  }

  tenerEdificios(){
    let edificios : Array<any> = new Array<any>();
    this.edificios.forEach(data=>{
      if(data.Estado == '01' && data.Institucion == this.institucion){
        edificios.push(data);
      }
    });
    return edificios;
  }

  asignarEdificio(){
    this.edificio = this.formularioBuscar.value.Edificio;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  filtrarAulas(){
    let cadena = this.formularioBuscar.value.Aula.toLowerCase();
    let aulas = new Array<any>();
    if(cadena !== '') {
      this.aulas.forEach(
        (data) => {
          let info = data.Descripcion.toLowerCase();
          if(data.Edificio == this.edificio && data.Estado == this.estado && data.Institucion == this.institucion){
            if(info.indexOf(cadena,0)===0){
              aulas.push(data);
            }
          }
        }
      );
    } else {
      this.aulas.forEach(
        (data) => {
          if(data.Estado == this.estado && data.Institucion == this.institucion && data.Edificio == this.edificio){
            aulas.push(data);
          }
        }
      );
    }
    return aulas;
  }

  tenerEstadosAulas(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '06') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Aula: [''],
      Edificio: ['']
    });
  }

}
