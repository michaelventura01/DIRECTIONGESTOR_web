import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  formularioBuscar: FormGroup;
  estado: string;
  instituto: string;
  presentacion: boolean;

  constructor(
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private direccionServicio: DireccionService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.buscarEdificio();
    this.estados = this.estadoServicio.verEstados();
    this.edificios = this.edificioServicio.verEdificios();
    this.instituto = localStorage.getItem('instituto');
    this.estado = '01';
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.presentacion = true;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  tenerEstadosEdificios(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '06') {
        state.push(dato);
      }
    });
    return state
  }

  listadoEdificioPDF(){
    const doc = new jsPDF('portrait', 'px', 'a4');
    let edificios = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();

    titulos = ['#' , 'EDIFICIO' , 'DIRECCION' , 'CIUDAD', 'PAIS', 'ESTADO' ];

    this.filtrarEdificios().forEach( edificio => {
      this.estados.forEach( estado => {
        if (estado.id === edificio.Estado) {
          ids.push(edificio.id);
          this.ciudades.forEach(ciudad => {
            if(ciudad.id === edificio.Ciudad){
              this.paises.forEach(pais => {
                if(pais.id === edificio.Pais){
                  edificios.push([
                    ids.indexOf(edificio.id) + 1,
                    edificio.Nombre.toUpperCase(),
                    edificio.Direccion.toUpperCase(),
                    ciudad.descripcion.toUpperCase(),
                    pais.descripcion.toUpperCase(),
                    estado.descripcion.toUpperCase()
                  ]);
                }
              });
            }
          });
        }
      });
    });

    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Edificios Encontradas');

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);
    (doc as any).autoTable({
      head: [titulos],
      body: edificios,
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
    doc.save('EdificiosEncontradas.pdf');

  }

  cambiarPresentacion(){
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }
  }

  filtrarEdificios(){
    let cadena = this.formularioBuscar.value.Institucion.toLowerCase();
    let edificios = new Array<any>();
    if(cadena !== '') {
      this.edificios.forEach(
        (data) => {
          let nombre = data.Nombre.toLowerCase();
          if(nombre.indexOf(cadena, 0) !== -1 && data.Estado == this.estado && data.Institucion == this.instituto){
            edificios.push(data);
          }
        }
      );
    } else {
      this.edificios.forEach(
        (data) => {
          if(data.Estado == this.estado && data.Institucion == this.instituto){
            edificios.push(data);
          }
        }
      );

    }
    return edificios;
  }

  buscarEdificio(){
    this.formularioBuscar = this.formBuilder.group(
      {
        Estado: [''],
        Institucion: ['']
      }
    );
  }

}
