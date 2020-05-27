import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { EstadoService } from 'src/app/services/estado.service';

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

  constructor(
    private estudianteServicio: EstudianteService,
    private personaServicio: PersonaService,
    private institutoServicio: InstitucionService,
    private estadoServicio: EstadoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.crearBuscador();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.Estado = '01';

    this.institucion = localStorage.getItem('instituto');
  }

  asignarEstado(){
    this.Estado = this.buscarFormulario.value.Estado;
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
