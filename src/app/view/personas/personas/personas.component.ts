import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private contactoServicio: ContactoService
  ) {

  }

  ngOnInit() {
    this.crearBuscador();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.paises = this.direccionServicio.verPaises();
    this.sexos = this.personaServicio.verSexos();
    this.Estado = '01';

  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  verPersona(data) {
    this.router.navigate(['/personaDetalle', data]);
  }

  filtrarPersonas(evento){
    let cadena = evento.target.value.toLowerCase();
    let people = new Array<any>();
    if(cadena !== '') {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if(nombreapellido.indexOf(cadena, 0) !== -1){
            people.push(data);
          }
        }
      );
      this.personas = new Array<any>();
      this.personas = people;
    } else {
      this.personas = new Array<any>();
      this.personas = this.personaServicio.verPersonas();
    }
    return this.personas;
  }

  crearBuscador(){
    this.buscarFormulario = this.formBuilder.group(
      {
        Estado: [''],
        Persona: ['']
      }
    );
  }

  tenerSoloEstado(data){
    this.Estado = data.target.value;
  }

  tenerEstadosPersonas(data){
    let state = new Array<any>();
    data.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '02') {
        state.push(dato);
      }
    });
    this.estados = new Array<any>();
    this.estados = state;


  }


}
