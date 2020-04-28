
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstadoService } from 'src/app/services/estado.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-editempleado',
  templateUrl: './editempleado.component.html',
  styleUrls: ['./editempleado.component.css']
})
export class EditempleadoComponent implements OnInit {
  idEmpleado: string;
  formularioEditar: FormGroup;
  empleados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  puestosTrabajos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioEmpleado: FormGroup;
  codigoEmpleado: string;
  instituciones: Array<any> = new Array<any>();
  existeEmpleado: boolean;
  Empleado: string;
  PuestoTrabajo: string;
  Sueldo: number;
  Estado: string;
  FechaInicio: Date;
  FechaFin: Date;
  instituto: string;
  esPuestoTrabajo: boolean;
  esEstado: boolean;
  esFechaInicio: boolean;
  esFechaFin: boolean;
  esCorrectoEstado: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private empleado: ActivatedRoute,
    private empleadoServicio: EmpleadoService,
    private estadoServicio: EstadoService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router

    ) {

    }

  ngOnInit() {
    this.editarFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.puestosTrabajos = this.empleadoServicio.verPuestosTrabajos();
    this.estados = this.estadoServicio.verEstados();
    this.idEmpleado = this.empleado.snapshot.params['id'];

    this.esPuestoTrabajo = false;
    this.esEstado = false;
    this.esFechaInicio = false;
    this.esFechaFin = false;

    this.esCorrectoEstado = true;

    this.instituto = localStorage.getItem('instituto');

  }

  tenerEstadosEmpleados(data, empleado){
    this.esEstado = true;
    this.esFechaFin = true;
    let states = new Array<any>();
    data.forEach(dato => {
      if(dato.iddominioestado === '00' || dato.iddominioestado === '04'){
        states.push(dato);
      }
    });

    if(empleado === '01'){
      this.esFechaFin = false;
    }else{
      this.esFechaFin = true;
    }

    if(empleado === ''){
      this.esCorrectoEstado = false;
    }else{
      this.esCorrectoEstado = true;
    }

    this.estados = new Array<any>();
    this.estados = states;
    return states;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  editarPuesto(){
    this.esPuestoTrabajo = true;

  }

  editarFechaInicio(){

    this.esFechaInicio = true;
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  controlSalida(entrada, salida){

    if((this.obtenerFecha(new Date(salida)).time.getFullYear() - this.obtenerFecha(entrada).time.getFullYear())<0){
      this.esFechaFin = false;
    }else{
      this.esFechaFin = true;
    }



  }




  editarEmpleado(data){

    if(this.formularioEditar.value.Sueldo == 0){
      this.Sueldo = data.Sueldo;
    }else{
      this.Sueldo = this.formularioEditar.value.Sueldo;
    }

    if (this.formularioEditar.value.FechaInicio === '') {
      this.FechaInicio = this.obtenerFecha(data.fechaInicio).time;
    } else {
      this.FechaInicio = new Date(this.formularioEditar.value.FechaInicio);
    }

    if(this.formularioEditar.value.FechaFin == ""){
      this.FechaFin = data.FechaFin;
    }else{
      this.FechaFin = this.formularioEditar.value.FechaFin;
    }

    if(this.formularioEditar.value.Estado == ''){
      this.Estado = data.Estado;
    }else{
      this.Estado = this.formularioEditar.value.Estado;
    }

    if(this.formularioEditar.value.Puesto == ''){
      this.PuestoTrabajo = data.PuestoTrabajo;
    }else{
      this.PuestoTrabajo = this.formularioEditar.value.Puesto;
    }

    if(this.esCorrectoEstado){
      if(this.esFechaFin){
        if(this.FechaFin!== undefined){

          this.database.doc('empleados/'+this.idEmpleado).update({
            Codigo: data.Codigo,
            Estado: this.Estado,
            Sueldo: this.Sueldo,
            PuestoTrabajo: this.PuestoTrabajo,
            institucion: this.instituto,
            fechaInicio: new Date(this.FechaInicio),
            fechaFin: new Date(this.formularioEditar.value.FechaFin),
            Persona: data.Persona
          }).then(()=>{
            this.mensajeServicio.exito('Actualizado','Empleado ha sido actualizado con exito');
            this.router.navigate(['/empleadoDetalle', this.idEmpleado]);
          }).catch(() => {
            this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
            this.router.navigate(['/empleadoDetalle', this.idEmpleado]);
          });
        }
      }else{
        this.database.doc('empleados/'+this.idEmpleado).update({
          Codigo: data.Codigo,
          Estado: this.Estado,
          Sueldo: this.Sueldo,
          PuestoTrabajo: this.PuestoTrabajo,
          institucion: this.instituto,
          fechaInicio: new Date(this.FechaInicio),
          Persona: data.Persona
        }).then(()=>{
          this.mensajeServicio.exito('Actualizado','Empleado ha sido actualizado con exito');
          this.router.navigate(['/empleadoDetalle', this.idEmpleado]);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/empleadoDetalle', this.idEmpleado]);
        });
      }
    }
  }

  verEmpleado(){
    this.router.navigate(['/empleadoDetalle',this.idEmpleado]);
  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Persona: [{value: '' , disabled: true}],
        Codigo: [{value:'', disabled: true}, Validators.compose([Validators.required])],
        Estado: ['', Validators.compose([Validators.required])],
        Sueldo: ['', Validators.compose([Validators.required])],
        Puesto: ['', Validators.compose([Validators.required])],
        FechaInicio: ['', Validators.compose([Validators.required])],
        FechaFin: ['']
      }
    );
  }
}

