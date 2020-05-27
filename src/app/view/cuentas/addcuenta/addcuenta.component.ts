import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from 'src/app/services/cuenta.service';
import { PersonaService } from 'src/app/services/persona.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcuenta',
  templateUrl: './addcuenta.component.html',
  styleUrls: ['./addcuenta.component.css']
})
export class AddcuentaComponent implements OnInit {
  tipos: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  formularioCreado: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private cuentaServicio: CuentaService,
    private personaServicio: PersonaService,
    private database: AngularFirestore,
    private router: Router,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {
    this.crearFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.tipos = this.cuentaServicio.verTipoCuentas();
    this.personas = this.personaServicio.verPersonas();
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

  guardarCuenta(){
    let persona = this.formularioCreado.value.Persona;
    let monto = this.formularioCreado.value.Monto;
    let tipo = this.formularioCreado.value.Tipo;
    let descripcion = this.formularioCreado.value.Descripcion;
    let fecha = new Date(this.formularioCreado.value.Fecha);

    this.database.collection('cuentas').add({
        Tipo: tipo,
        Descripcion: descripcion,
        Monto: monto,
        Fecha: fecha,
        Persona: persona,
        Institucion: this.institucion,
        Estado: '01'
      }).then(()=>{
        this.mensajeServicio.exito('Guardado','Cuenta ha sido agregado con exito');
        this.router.navigate(['/cuentas']);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/cuentas']);
      });
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Tipo: ['', Validators.compose([Validators.required])],
        Descripcion: ['', Validators.compose([Validators.required])],
        Monto: ['', Validators.compose([Validators.required])],
        Fecha: ['', Validators.compose([Validators.required])],
        Persona: ['', Validators.compose([Validators.required])],
        buscarPersona:['']
      }
    );
  }


}
