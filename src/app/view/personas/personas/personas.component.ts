import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  tipoTelefonos: Array<any> = new Array<any>();
  buscarFormulario: FormGroup;
  Estado: string;
  persona: string;
  presentacion: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private spinner: NgxSpinnerService
  ) {  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.crearBuscador();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();
    this.sexos = this.personaServicio.verSexos();
    this.Estado = '01';
    this.persona = '';
    this.presentacion = true;
  }

  cambiarPresentacion() {
    if (this.presentacion) {
      this.presentacion = false;
    } else {
      this.presentacion = true;
    }

  }

  asignarPersona(event) {
    this.persona = event.target.value;
  }

  obtenerFecha(data) {
    return this.personaServicio.obtenerFecha(data);
  }

  filtrarPersonas(event) {
    let people = new Array<any>();

    this.personas.forEach(data => {
      if (data.Estado === this.Estado) {
        let nombreapellido = data.Nombre.toLowerCase() + ' ' + data.Apellido.toLowerCase();
        if (nombreapellido.indexOf(event.toLowerCase(), 0) > -1 ) {
          people.push(data);
        }
      }
    }
  );

    return people;
  }

  listadoPersonaPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');
    let personas = new Array<any>();
    let ids = new Array<any>();
    let titulos = new Array<any>();
    titulos = ['#' , 'NOMBRE' , 'FECHA DE NACIMIENTO' , 'NACIONALIDAD' , 'SEXO' ];

    this.filtrarPersonas(this.buscarFormulario.value.Persona).forEach(persona => {
      this.paises.forEach(pais => {
        if (persona.Nacionalidad === pais.id) {
          this.sexos.forEach(sexo => {
            if (sexo.id === persona.Sexo) {
              ids.push(persona.id);
              personas.push([
                ids.indexOf(persona.id) + 1,
                persona.Nombre.toUpperCase() + ' ' + persona.Apellido.toUpperCase(),
                this.obtenerFecha(persona.FechaNacimiento).fechaNacimiento.toUpperCase(),
                pais.nacionalidad.toUpperCase(),
                sexo.descripcion.toUpperCase()
              ]);
            }
          });
        }
      });
    });

    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(35, 20, 'Listado de Personas Encontradas');

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);
    (doc as any).autoTable({
      head: [titulos],
      body: personas,
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
    doc.save('PersonasEncontradas.pdf');

  }

  crearBuscador() {
    this.buscarFormulario = this.formBuilder.group(
      {
        Estado: [''],
        Persona: ['']
      }
    );
  }

  tenerSoloEstado(data) {
    this.Estado = data.target.value;
  }

  tenerEstadosPersonas() {
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '02') {
        state.push(dato);
      }
    });
    return state;
  }
}
