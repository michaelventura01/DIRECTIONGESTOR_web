import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from 'src/app/services/cuenta.service';
import { PersonaService } from 'src/app/services/persona.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-editcuenta',
  templateUrl: './editcuenta.component.html',
  styleUrls: ['./editcuenta.component.css']
})
export class EditcuentaComponent implements OnInit {
  tipos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cuentas: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  idCuenta: string;
  formularioCreado: FormGroup;
  esFecha: boolean;
  esEstado: boolean;
  esTipo: boolean;
  constructor(
    private formBuilder:FormBuilder,
    private cuentaServicio: CuentaService,
    private personaServicio: PersonaService,
    private database: AngularFirestore,
    private router: Router,
    private ruta: ActivatedRoute,
    private estadoServicio: EstadoService,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {
    this.editarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.tipos = this.cuentaServicio.verTipoCuentas();
    this.personas = this.personaServicio.verPersonas();
    this.cuentas = this.cuentaServicio.verCuentas();
    this.idCuenta = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
  }

  cambiarFecha(){
    this.esFecha = true;
  }
  cambiarEstado(){
    this.esEstado = true;
  }
  cambiarTipo(){
    this.esTipo = true;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerEstados(){
    let states = new Array<any>();
    this.estados.forEach(dato => {
      if(dato.iddominioestado === '00' || dato.iddominioestado === '12'){
        states.push(dato);
      }
    });
    return states;
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

  editarCuenta(cuenta){

    let fechaHora:Date = new Date();

    let monto = this.formularioCreado.value.Monto;
    if(monto === ''){
      monto = cuenta.Monto;
    }

    let tipo = this.formularioCreado.value.Tipo;
    if(tipo === ''){
      tipo = cuenta.Tipo;
    }

    let descripcion = this.formularioCreado.value.Descripcion;
    if(descripcion === ''){
      descripcion = cuenta.Descripcion;
    }

    let fecha = new Date(this.formularioCreado.value.Fecha);
    if(this.formularioCreado.value.Fecha === ''){
      fecha = cuenta.Fecha;
    }

    let estado = this.formularioCreado.value.Estado
    if(estado === ''){
      estado = cuenta.Estado;
    }



    this.database.doc('cuentas/'+this.idCuenta).update({
      Tipo: tipo,
      Descripcion: descripcion,
      Monto: monto,
      Fecha: fecha,
      Persona: cuenta.Persona,
      Institucion: this.institucion,
      Estado: estado
    }).then(()=>{
      if(estado === '06'){
        if(tipo === 'cpc'){
          this.database.collection('movimientos').add({
            Descripcion: 'saldo de ' + descripcion,
            Tipo: 'ing',
            Monto: monto,
            FechaHora: fechaHora,
            Institucion: this.institucion,
            Estado: '01'
          })
        }else if(tipo === 'cpp'){
          this.database.collection('movimientos').add({
            Descripcion: 'pago de ' + descripcion,
            Tipo: 'gas',
            Monto: monto,
            FechaHora: fechaHora,
            Institucion: this.institucion,
            Estado: '01'
          })
        }
      }
      this.mensajeServicio.exito('Actualizado','Cuenta ha sido actualizado con exito');
      this.router.navigate(['/cuentaDetalle', this.idCuenta]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/cuentaDetalle', this.idCuenta]);
    });
  }

  editarFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Tipo: [''],
        Descripcion: [''],
        Monto: [''],
        Fecha: [''],
        Persona: [{value:'', disabled: true}],
        Estado:['']
      }
    );
  }



}

