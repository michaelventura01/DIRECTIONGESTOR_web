import { Component, OnInit } from '@angular/core';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  movimeintos: Array<any> = new Array<any>();
  tipos: Array<any> = new Array<any>();
  formularioBuscar: FormGroup;
  institucion: string;
  ingresos: number;
  gastos: number;
  ganancias: number;
  esTiempo: boolean;
  tiempo: Date;
  tipo: string;

  descripcion: string;

  constructor(
    private movimientoServicio: MovimientoService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.tipos = this.movimientoServicio.verTiposMoviemientos();
    this.movimeintos = this.movimientoServicio.verMovimientos();
    this.institucion = localStorage.getItem('instituto');
    this.tipo ='0';
    this.tiempo = new Date();
    this.esTiempo = false;
    this.ingresos= 0;
    this.gastos= 0;
    this.ganancias= 0;

    this.descripcion = '';

  }

  cambiarTiempo(){
    this.esTiempo = true;
  }

  asignarTipo(){
    this.tipo = this.formularioBuscar.value.Tipo;
  }


  tenerFechaActual(){
    return this.personaServicio.obtenerFechaActual().fecha ;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
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

  asignarDescripcion(event){
    let data = event.target.value.toLowerCase();
    this.descripcion= data;
  }

  tenerMovimientos(){
    let movimientos: Array<any> = new Array<any>();
    this.ingresos = 0 ;
    this.gastos = 0;

    this.movimeintos.forEach(movimiento => {
      if (movimiento.Institucion === this.institucion && movimiento.Estado === '01') {
        if (this.tipo !== '0'){
          if (this.tipo === movimiento.Tipo && this.tenerTiempo().mesAno === this.tenerFecha(movimiento.FechaHora).mesAno){
            let dato = movimiento.Descripcion;
            if (dato.indexOf(this.descripcion, 0) > -1) {
              movimientos.push(movimiento);
              if (movimiento.Tipo === 'ing' ) {this.ingresos += movimiento.Monto;
              } else if (movimiento.Tipo === 'gas') {this.gastos += movimiento.Monto; }
            }
          }
        } else {
          if (this.tenerTiempo().mesAno === this.tenerFecha(movimiento.FechaHora).mesAno){
            let dato = movimiento.Descripcion;
            if (dato.indexOf(this.descripcion, 0) > -1){
              movimientos.push(movimiento);
              if (movimiento.Tipo === 'ing' ) { this.ingresos += movimiento.Monto;
              } else if ( movimiento.Tipo === 'gas') { this.gastos += movimiento.Monto; }
            }

          }
        }
      }
    });
    this.ganancias = this.ingresos - this.gastos;
    console.log(movimientos);
    return movimientos;
  }



  tenerEstados(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '11') {
        state.push(dato);
      }
    });
    return state;
  }

  buscarFormulario() {
    this.formularioBuscar = this.formbuilder.group({
      Descripcion: [''],
      Tipo: [''],
      Fecha: ['']
    });
  }
}
