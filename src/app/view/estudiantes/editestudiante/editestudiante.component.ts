
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstadoService } from 'src/app/services/estado.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editestudiante',
  templateUrl: './editestudiante.component.html',
  styleUrls: ['./editestudiante.component.css']
})
export class EditestudianteComponent implements OnInit {

  idEstudiante: string;
  formularioEditar: FormGroup;
  estudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioEstudiante: FormGroup;
  codigoEstudiante: string;
  instituciones: Array<any> = new Array<any>();
  existeEstudiante: boolean;
  Estudiante: string;
  Mensualidad: number;
  Estado: string;
  FechaInicio: Date;
  FechaFin: Date;
  instituto: string;
  esEstado: boolean;
  esFechaInicio: boolean;
  esFechaFin: boolean;
  esCorrectoEstado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private personaServicio: PersonaService,
    private ruta: ActivatedRoute,
    private estudianteServicio: EstudianteService,
    private estadoServicio: EstadoService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.crearFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.estados = this.estadoServicio.verEstados();
    this.idEstudiante = this.ruta.snapshot.params['id'];

    this.esEstado = false;
    this.esFechaInicio = false;
    this.esFechaFin = false;

    this.esCorrectoEstado = true;

    this.instituto = localStorage.getItem('instituto');
  }

  tenerEstadosEstudiantes(data, estudiante){
    this.esEstado = true;
    this.esFechaFin = true;
    let states = new Array<any>();
    data.forEach(dato => {
      if(dato.iddominioestado === '00' || dato.iddominioestado === '03'){
        states.push(dato);
      }
    });

    if(estudiante === '01'){
      this.esFechaFin = false;
    }else{
      this.esFechaFin = true;
    }

    if(estudiante === ''){
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


  editarEstudiante(data){

    this.spinner.show()

    if(this.formularioEditar.value.Mensualidad == 0){
      this.Mensualidad = data.Mensualidad;
    }else{
      this.Mensualidad = this.formularioEditar.value.Mensualidad;
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

    if(this.esCorrectoEstado){
      if(this.esFechaFin){
        if(this.FechaFin!== undefined){
          this.database.doc('estudiantes/'+this.idEstudiante).update({
            Codigo: data.Codigo,
            Estado: this.Estado,
            Mensualidad: this.Mensualidad,
            institucion: this.instituto,
            fechaInicio: new Date(this.FechaInicio),
            fechaFin: new Date(this.FechaFin),
            fechaAgregacion: this.obtenerFecha(data.fechaAgregacion).time,
            fechaModificacion: new Date(),
            Persona: data.Persona
          }).then(()=>{
            this.spinner.hide();
            this.mensajeServicio.exito('Actualizado','Estudiante ha sido actualizado con exito');
            this.router.navigate(['/estudianteDetalle', this.idEstudiante]);
          }).catch(() => {
            this.spinner.hide();
            this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
            this.router.navigate(['/']);
          });
        }
      }else{
        this.database.doc('estudiantes/'+this.idEstudiante).update({
          Codigo: data.Codigo,
          Estado: this.Estado,
          Mensualidad: this.Mensualidad,
          institucion: this.instituto,
          fechaInicio: new Date(this.FechaInicio),
          fechaAgregacion: this.obtenerFecha(data.fechaAgregacion).time,
          fechaModificacion: new Date(),
          Persona: data.Persona
        }).then(()=>{
          this.spinner.hide();
          this.mensajeServicio.exito('Actualizado','Estudiante ha sido actualizado con exito');
          this.router.navigate(['/estudianteDetalle', this.idEstudiante]);
        }).catch(() => {
          this.spinner.hide();
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/']);
        });
      }
    }
  }

  crearFormulario(){
    this.formularioEditar = this.formBuilder.group(
    {
      Estado: ['', Validators.compose([Validators.required])],
      Mensualidad: ['', Validators.compose([Validators.required])],
      Codigo: [{value:'', disabled: true}, Validators.compose([Validators.required])],
      Persona: [{value: '' , disabled: true}],
      FechaInicio: ['', Validators.compose([Validators.required])],
      FechaFin: ['']
    }
    );
  //
 }
}

