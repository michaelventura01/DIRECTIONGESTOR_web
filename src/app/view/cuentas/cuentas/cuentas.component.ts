import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuentaService } from 'src/app/services/cuenta.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  tipos: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cuentas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  esTiempo: boolean;
  tiempo: Date;
  tipo: string;
  estado:string;
  persona: string;
  cuantasCobrar: number;
  cuentasPagar: number;
  cantidadCobrar: number;
  cantidadPagar: number;
  formularioBuscar: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private cuentaServicio: CuentaService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService
    ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.tipos = this.cuentaServicio.verTipoCuentas();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.institucion = localStorage.getItem('instituto');
    this.cuentas = this.cuentaServicio.verCuentas();
    this.tipo ='0';
    this.estado ='0';
    this.cuantasCobrar = 0;
    this.cuentasPagar = 0;
    this.cantidadCobrar = 0;
    this.cantidadPagar = 0;
    this.tiempo = new Date();
    this.esTiempo = false;
    this.persona = '';
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  cambiarTiempo(){
    this.esTiempo = true;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  asignarTipo(){
    this.tipo = this.formularioBuscar.value.Tipo;
  }

  tenerFechaActual(){
    return this.personaServicio.obtenerFechaActual().fecha ;
  }

  asignarPersona(){
    this.persona = this.formularioBuscar.value.Persona.toLowerCase();
  }

  tenerTiempo(){
    this.tiempo = new Date();
    if(this.formularioBuscar.value.Fecha!=''){
      this.tiempo = new Date(this.formularioBuscar.value.Fecha);
    }
    let dia: string;

    let mes: string;
    if (this.tiempo.getDate() < 10 ) {
      dia = '0' + this.tiempo.getDate().toString();
    } else {
      dia = this.tiempo.getDate().toString();
    }
    if ((this.tiempo.getMonth() + 1) < 10 ) {
      mes = '0' + (this.tiempo.getMonth() + 1).toString();
    } else {
      mes = (this.tiempo.getMonth() + 1).toString();
    }
    return  {
      mesAno: mes + '-' + this.tiempo.getFullYear(),
      fecha: mes + '/' + dia + '/' + this.tiempo.getFullYear(),
    };
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

  filtrarCuentas(){
    let cuentas = new Array<any>();
    this.cuantasCobrar = 0;
    this.cuentasPagar = 0;
    this.cantidadCobrar = 0;
    this.cantidadPagar = 0;

    this.cuentas.forEach(cuenta => {
      if(cuenta.Institucion === this.institucion){
        if(this.estado === '0'){
          if(this.tipo === '0'){

            this.personas.forEach(persona => {
              if(persona.id === cuenta.Persona){
                let nombre = persona.Nombre + ' ' + persona.Apellido;
                if(nombre.indexOf(this.persona, 0) >-1 ){
                  cuentas.push(cuenta);
                  if(cuenta.Tipo === 'cpc'){
                    this.cuantasCobrar += 1;
                    this.cantidadCobrar += cuenta.Monto;
                  }else if(cuenta.Tipo === 'cpp'){
                    this.cuentasPagar += 1;
                    this.cantidadPagar = cuenta.Monto;
                  }
                }
              }
            });
          }else{
              if(cuenta.Tipo === this.tipo){
                this.personas.forEach(persona => {
                  if(persona.id === cuenta.Persona){
                    let nombre = persona.Nombre + ' ' + persona.Apellido;
                    if(nombre.indexOf(this.persona, 0) >-1 ){
                      cuentas.push(cuenta);
                      if(cuenta.Tipo === 'cpc'){
                        this.cuantasCobrar += 1;
                        this.cantidadCobrar += cuenta.Monto;
                      }else if(cuenta.Tipo === 'cpp'){
                        this.cuentasPagar += 1;
                        this.cantidadPagar = cuenta.Monto;
                      }
                    }
                  }
                });
            }
          }
        }else if(cuenta.Estado === this.estado){
          if(this.tipo === '0'){
            this.personas.forEach(persona => {
              if(persona.id === cuenta.Persona){
                let nombre = persona.Nombre + ' ' + persona.Apellido;
                if(nombre.indexOf(this.persona, 0) >-1 ){
                  cuentas.push(cuenta);
                  if(cuenta.Tipo === 'cpc'){
                    this.cuantasCobrar += 1;
                    this.cantidadCobrar += cuenta.Monto;
                  }else if(cuenta.Tipo === 'cpp'){
                    this.cuentasPagar += 1;
                    this.cantidadPagar = cuenta.Monto;
                  }
                }
              }
            });
          }else{
              if(cuenta.Tipo === this.tipo){
                this.personas.forEach(persona => {
                  if(persona.id === cuenta.Persona){
                    let nombre = persona.Nombre + ' ' + persona.Apellido;
                    if(nombre.indexOf(this.persona, 0) >-1 ){
                      cuentas.push(cuenta);
                      if(cuenta.Tipo === 'cpc'){
                        this.cuantasCobrar += 1;
                        this.cantidadCobrar += cuenta.Monto;
                      }else if(cuenta.Tipo === 'cpp'){
                        this.cuentasPagar += 1;
                        this.cantidadPagar = cuenta.Monto;
                      }
                    }
                  }
                });
            }
          }
        }
      }
    });

    return cuentas;
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Persona:[''],
      Estado:[''],
      Tipo:[''],
      Fecha:['']
    });
  }

}
