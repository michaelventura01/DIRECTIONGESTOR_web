import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  templateUrl: './addreacion.component.html',
  styleUrls: ['./addreacion.component.css']
})
export class AddreacionComponent implements OnInit {

  personas: Array<any> = new Array<any>();
  relaciones: Array<any> = new Array<any>();
  tiposrelaciones: Array<any> = new Array<any>();
  formularioCreado: FormGroup;
  idPersona: string;

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private personaServicio: PersonaService,
    private router: Router,
    private ruta: ActivatedRoute,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {
    this.crearFormulario();
    this.idPersona = this.ruta.snapshot.params['persona'];
    this.personas = this.personaServicio.verPersonas();
    this.tiposrelaciones = this.personaServicio.verTiposRelaciones();
    this.relaciones = this.personaServicio.verRelaciones();
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  buscarRelacion() {
    let relacion: any;
    this.relaciones.forEach(relation => {
      if (relation.Persona === this.idPersona && relation.Relacionado === this.formularioCreado.value.Persona) {
        relacion = relation;
      }
    });
    console.log(relacion);
    return relacion;
  }

  filtrarPersonas(evento){
    let personas = new Array<any>();
    let cadena = evento.toLowerCase();
    let people = new Array<any>();
    if(cadena !== '') {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if (nombreapellido.indexOf(cadena, 0) !== -1 && data.Estado === '01' && data.id !== this.idPersona) {
            people.push(data);
          }
        }
      );
      personas = people;
    }
    return personas;
  }


  agregarRelacion() {
    let fechaActual = new Date();
    let residencia: boolean;
    if (this.formularioCreado.value.Residencia === '0') {
      residencia = false;
    } else {
      residencia = true;
    }
    if (!this.buscarRelacion()) {
      this.database.collection('relaciones').add({
        Persona: this.idPersona,
        TipoRelacion: this.formularioCreado.value.Relacion,
        Relacionado: this.formularioCreado.value.Persona,
        Residencia: residencia,
        Estado: '01',
        FechaAgregacion: fechaActual
      }).then(() => {
          this.mensajeServicio.exito('Guardado', 'Relacion ha sido agregada con exito');
          this.router.navigate(['/personaDetalle', this.idPersona]);
      }).catch(() => {
        this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
        this.router.navigate(['/personaDetalle', this.idPersona]);
      });
    } else {
      this.mensajeServicio.info('Registro Existente', 'Relacion ha sido agregada anteriormente');
      this.router.navigate(['/personaDetalle', this.idPersona]);
    }
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      buscarPersona: [''],
      Persona : ['', Validators.compose([Validators.required])],
      Relacion : ['', Validators.compose([Validators.required])],
      Residencia : ['', Validators.compose([Validators.required])]
    });
  }

}
