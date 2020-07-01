import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { EstadoService } from 'src/app/services/estado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  buscarFormulario: FormGroup;
  Estado: string;
  estudiante: string;
  institucion: string;
  presentacion: boolean;

  constructor(
    private estudianteServicio: EstudianteService,
    private personaServicio: PersonaService,
    private institutoServicio: InstitucionService,
    private estadoServicio: EstadoService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.crearBuscador();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.Estado = '01';
    this.presentacion = true;
    this.institucion = localStorage.getItem('instituto');
  }

  asignarEstado(){
    this.Estado = this.buscarFormulario.value.Estado;
  }

  cambiarPresentacion(){
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }
  }

  listadoEstudiantesPDF(){

    const doc = new jsPDF('portrait', 'px', 'a4');
    let estudiantes = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();

    titulos = ['#' , 'NOMBRES','APELLIDOS' , 'CODIGO' , 'ESTADO' ];

    this.filtrarEstudiantes().forEach( estudiante => {
      this.estados.forEach( estado => {
        if (estado.id === estudiante.Estado) {
          this.personas.forEach(persona => {
            if(persona.id === estudiante.Persona){
              ids.push(estudiante.id);
              estudiantes.push([
                ids.indexOf(estudiante.id) + 1,
                persona.Nombre.toUpperCase(),
                persona.Apellido.toUpperCase(),
                estudiante.Codigo.toUpperCase(),
                estado.descripcion.toUpperCase()
              ]);
            }
          });
        }
      });
    });


    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Estudiantes Encontrados');

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);
    (doc as any).autoTable({
      head: [titulos],
      body: estudiantes,
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
    doc.save('EstudiantesEncontrados.pdf');

  }

  filtrarEstudiantes(){

    let cadena = this.buscarFormulario.value.Persona.toLowerCase();
    let people = new Array<any>();
    this.personas.forEach(
      (data) => {
        let nombreapellido = data.Nombre + ' ' + data.Apellido;
        if(nombreapellido.indexOf(cadena, 0) !== -1 ){
          this.estudiantes.forEach(contenido => {
            if(data.id === contenido.Persona && contenido.Estado === this.Estado && this.institucion === contenido.institucion){
              people.push(contenido);
            }
          });
        }
      }
    );

    console.log(people);
    return people;
  }


  tenerEstados(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '03') {
        state.push(dato);
      }
    });
    return state;
  }

  crearBuscador(){
    this.buscarFormulario = this.formBuilder.group(
      {
        Estado: [''],
        Persona: ['']
      }
    );
  }


}
