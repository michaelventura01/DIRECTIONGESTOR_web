import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { PersonaService } from 'src/app/services/persona.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadoService } from 'src/app/services/estado.service';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-addestudiante',
  templateUrl: './addestudiante.component.html',
  styleUrls: ['./addestudiante.component.css']
})
export class AddestudianteComponent implements OnInit {


  instituto: string;
  persona: string;
  institucion: any;
  estudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioEstudiante: FormGroup;
  codigoEstudiante: string;
  mensaje: string;
  existeEstudiante: boolean;
  esUsuario: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteServicio: EstudianteService,
    private personaServicio: PersonaService,
    private database: AngularFirestore,
    private estadoServicio: EstadoService,
    private router: Router,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {
    this.crearFormulario();
    this.instituto = localStorage.getItem('instituto');
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.estados = this.estadoServicio.verEstados();
    this.personas = this.personaServicio.verPersonas();
    this.formarCodigo();
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
    this.codigoEstudiante= 'est'+mili+rand+letras;

    return this.codigoEstudiante.toString();

  }

  tenerEstadosEstudiantes(data){
    let states = new Array<any>();
    data.forEach(dato => {
      if(dato.iddominioestado === '00' || dato.iddominioestado === '03'){
        states.push(dato);
      }
    });
    return states;
  }
  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
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

  buscarEstudiante(){
    let estudiantes = new Array<any>();
    this.estudiantes.forEach(
      contenido => {
        if(this.formularioEstudiante.value.Persona === contenido.Persona && contenido.Institucion === this.instituto){
          estudiantes.push(contenido);
        }
      }
    );

    if(estudiantes.length>0){
      this.existeEstudiante = true;
    }else{
      this.existeEstudiante = false;
    }
    return this.existeEstudiante;
  }

  crearFormulario(){
    this.formularioEstudiante = this.formBuilder.group(
    {
        buscarPersona: [''],
        Persona: ['', Validators.compose([Validators.required])],
        Codigo: [{value: this.codigoEstudiante, disabled: true}, Validators.compose([Validators.required])],
        Mensualidad: ['', Validators.compose([Validators.required])],
        FechaInicio: ['', Validators.compose([Validators.required])]
    }
    );
  }

  agregarEstudiante(){

    if(!this.buscarEstudiante()){
      this.persona = this.formularioEstudiante.value.Persona;
      this.database.collection('estudiantes').add(
      {
        Codigo: this.codigoEstudiante,
        Persona: this.formularioEstudiante.value.Persona,
        Estado: '01',
        Mensualidad: this.formularioEstudiante.value.Mensualidad,
        institucion: this.instituto,
        fechaInicio: new Date(this.formularioEstudiante.value.FechaInicio)
      }).then(()=>{
        this.mensajeServicio.exito('Guardado','Estudiante ha sido agregado con exito');
        this.router.navigate(['/estudiantes']);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/estudiantes']);
      });
    }else{
      this.mensajeServicio.info('Registro Existente','Estudiante ha sido registrado anteriormente');
      this.router.navigate(['/estudiantes']);
    }
  }
}
