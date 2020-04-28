import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addempleado',
  templateUrl: './addempleado.component.html',
  styleUrls: ['./addempleado.component.css']
})
export class AddempleadoComponent implements OnInit {
  @Input() accion: string;
  @Input() instituto: string;
  @Input() persona: string;
  institucion: any;
  empleados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();

  puestosTrabajos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioEmpleado: FormGroup;
  codigoEmpleado: string;
  instituciones: Array<any> = new Array<any>();
  mensaje: string;
  existeEmpleado: boolean;
  esUsuario: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoServicio: EmpleadoService,
    private personaServicio: PersonaService,
    private institutoServicio: InstitucionService,
    private database: AngularFirestore,
    private estadoServicio: EstadoService,
    private router: Router,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {

    this.crearFormulario();
    this.instituciones = this.institutoServicio.verInstituciones();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.puestosTrabajos = this.empleadoServicio.verPuestosTrabajos();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.formarCodigo();
    


    this.esUsuario = false;


    if(this.accion!='Encargado'){
      this.accion = 'Empleado';
      this.persona = "";
      this.mensaje = "Filtra para seleccionar debajo una persona";

      this.instituto = JSON.stringify({id: localStorage.getItem('instituto')});


    }
  }

  buscarEmpleado(){
    let empleados = new Array<any>();
    this.empleados.forEach(
      contenido => {
        if(this.formularioEmpleado.value.Persona === contenido.Persona && contenido.Institucion === this.instituto){
          empleados.push(contenido);
        }
      }
    );

    if(empleados.length>0){
      this.existeEmpleado = true;
    }else{
      this.existeEmpleado = false;
    }
    return this.existeEmpleado;
  }

  verInstitucionId(info){
    let data: any;
    data = JSON.parse(info);
    let instituto: any;
    this.instituciones.forEach(institucion => {
      if(institucion.Nombre === data.Nombre && institucion.Descripcion === data.Descripcion){
        instituto = institucion;
      }
    });
    return instituto;
  }


  agregarEmpleado(institucion){


    if(!this.buscarEmpleado()){

      if(institucion){
        this.instituto = institucion.id;
      }else{
        this.instituto = localStorage.getItem('instituto');
      }

      this.persona = this.formularioEmpleado.value.Persona;

    this.database.collection('empleados').add(
      {
        Codigo: this.codigoEmpleado,
        Persona: this.formularioEmpleado.value.Persona,
        Estado: '01',
        Sueldo: this.formularioEmpleado.value.Sueldo,
        PuestoTrabajo: this.formularioEmpleado.value.PuestoTrabajo,
        institucion: this.instituto,
        fechaInicio: new Date(this.formularioEmpleado.value.FechaInicio)

      }).then(()=>{
        this.mensajeServicio.exito('Guardado','Empleado ha sido agregado con exito');
        if(this.accion === 'Encargado'){
          this.esUsuario = true;
        }else{
          this.router.navigate(['/empleados']);
        }
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        if(this.accion === 'Encargado'){
          this.router.navigate(['/institucionAgregar']);
        }else{
          this.router.navigate(['/empleados']);
        }
      });
    }else{
      this.mensajeServicio.info('Registro Existente','Empleado ha sido registrado anteriormente');
      if(this.accion === 'Encargado'){
        this.esUsuario = true;
      }else{
        this.router.navigate(['/empleados']);
      }
    }
  }

  tenerEstadosEmpleados(data){
    let states = new Array<any>();
    data.forEach(dato => {
      if(dato.iddominioestado === '00' || dato.iddominioestado === '04'){
        states.push(dato);
      }
    });
    return states;
  }
  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  formarCodigo(){
    let fecha = new Date();
    let mili = fecha.getMilliseconds().toString();
    let rand = Math.floor(Math.random() * 999).toString();
    fecha.getMilliseconds();
    switch(mili.length){
      case(2):
        mili += Math.floor(Math.random() * 9).toString();
        break;
      case(1):
        mili += Math.floor(Math.random() * 99).toString();
        break;
    }

    switch(rand.length){
      case(2):
        mili += Math.floor(Math.random() * 9).toString();
        break;
      case(1):
        mili += Math.floor(Math.random() * 99).toString();
        break;
    }

    let abc ="abcdefghijklmnopqrstuvwxyz";
    let letras="";
    let intento=0;
    do{
      intento++;
      letras+= abc[Math.floor(Math.random() * 25)];

    }while(intento<2);
    this.codigoEmpleado= 'emp'+mili+rand+letras;

    return this.codigoEmpleado.toString();

  }

  filtrarPersonas(evento){
    let personas = new Array<any>();
    let cadena = evento.toLowerCase();
    let people = new Array<any>();
    if(cadena !== '') {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if(nombreapellido.indexOf(cadena, 0) !== -1 && data.Estado == '01'){
            people.push(data);
          }
        }
      );
      personas = people;
    } else {
      personas = this.personas;
    }
    return personas;
  }

  crearFormulario(){
    this.formularioEmpleado = this.formBuilder.group(
      {
        buscarPersona: [''],
        Persona: ['', Validators.compose([Validators.required])],
        Codigo: [{value: this.codigoEmpleado, disabled: true}, Validators.compose([Validators.required])],
        Sueldo: ['', Validators.compose([Validators.required])],
        PuestoTrabajo: ['', Validators.compose([Validators.required])],
        FechaInicio: ['', Validators.compose([Validators.required])]
      }
    );
  }
}
