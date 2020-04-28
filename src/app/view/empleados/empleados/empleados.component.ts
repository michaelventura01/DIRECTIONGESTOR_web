import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadoService } from 'src/app/services/estado.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  puestosTrabajos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  buscarFormulario: FormGroup;
  Estado: string;
  empleado: string;
  institucion: string;

  constructor(
    private empleadoServicio: EmpleadoService,
    private personaServicio: PersonaService,
    private institutoServicio: InstitucionService,
    private database: AngularFirestore,
    private estadoServicio: EstadoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.crearBuscador();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.puestosTrabajos = this.empleadoServicio.verPuestosTrabajos();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.Estado = '01';

    this.institucion = localStorage.getItem('instituto');
  }

  tenerSoloEstado(data){
    this.Estado = data.target.value;
  }

  crearBuscador(){
    this.buscarFormulario = this.formBuilder.group(
      {
        Estado: [''],
        Persona: ['']
      }
    );
  }

  filtrarEmpleados(){

    let cadena = this.buscarFormulario.value.Persona.toLowerCase();
    let people = new Array<any>();
    if(cadena !== '') {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if(nombreapellido.indexOf(cadena, 0) !== -1 ){
            this.empleados.forEach(contenido => {
              if(data.id === contenido.Persona && contenido.Estado === this.Estado && this.institucion === contenido.institucion){
                people.push(contenido);

              }
            });
          }
        }
      );
    } else {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if(nombreapellido.indexOf(cadena, 0) !== -1 ){
            this.empleados.forEach(contenido => {
              if(data.id === contenido.Persona && contenido.Estado === this.Estado && this.institucion === contenido.institucion){
                people.push(contenido);
              }
            });
          }
        }
      );
    }
    return people;
  }

  tenerEstadosEmpleados(data){
    let state = new Array<any>();
    data.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '04') {
        state.push(dato);
      }
    });
    this.estados = new Array<any>();
    this.estados = state;
  }

  verEmpleado(data){
    this.router.navigate(['/empleadoDetalle',data]);
  }

}
