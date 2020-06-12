import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: './editreacion.component.html',
  styleUrls: ['./editreacion.component.css']
})
export class EditreacionComponent implements OnInit {

  personas: Array<any> = new Array<any>();
  relaciones: Array<any> = new Array<any>();
  tiposrelaciones: Array<any> = new Array<any>();
  formularioCreado: FormGroup;
  idRelacion: string;
  esTipo: boolean;
  esResidencia: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private personaServicio: PersonaService,
    private router: Router,
    private ruta: ActivatedRoute,
    private mensajeServicio: MensajeService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.crearFormulario();
    this.idRelacion = this.ruta.snapshot.params.id;
    this.personas = this.personaServicio.verPersonas();
    this.tiposrelaciones = this.personaServicio.verTiposRelaciones();
    this.relaciones = this.personaServicio.verRelaciones();
    this.esTipo = false;
    this.esResidencia = false;
  }

  cambiarTipo() {
    this.esTipo = true;

  }
  cambiarResidencia() {
    this.esResidencia = true;
  }


  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  editarRelacion(relacion) {
    this.spinner.show();
    let fechaActual = new Date();
    let residencia: boolean;
    if (this.formularioCreado.value.Residencia === '') {
      residencia = relacion.Residencia;
    } else {
      if (this.formularioCreado.value.Residencia === '0') {
        residencia = false;
      } else {
        residencia = true;
      }
    }

    let tipo = this.formularioCreado.value.Relacion;
    if ( tipo === '' ) {
      tipo = relacion.Relacion;
    }

    this.database.doc('relaciones/' + relacion.id).update({
      Persona: relacion.Persona,
      TipoRelacion: this.formularioCreado.value.Relacion,
      Relacionado: relacion.Relacionado,
      Residencia: residencia,
      Estado: '01',
      FechaAgregacion: this.tenerFecha(relacion.FechaAgregacion).time,
      FechaModificacion: fechaActual
    }).then(() => {
      this.spinner.hide();
      this.mensajeServicio.exito('Modificado', 'Relacion ha sido modificada con exito');
      this.router.navigate(['/personaDetalle', relacion.Persona]);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
      this.router.navigate(['/personaDetalle', relacion.Persona ]);
    });
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Relacion : [''],
      Residencia : ['']
    });
  }

}
