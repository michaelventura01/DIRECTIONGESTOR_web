import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editmovimiento',
  templateUrl: './editmovimiento.component.html',
  styleUrls: ['./editmovimiento.component.css']
})
export class EditmovimientoComponent implements OnInit {
  movimientos: Array<any> = new Array<any>();
  tiposMovimeintos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  tiempo: Date;
  esTiempo: boolean;
  esEstado: boolean;
  esTipo: boolean;
  usuario: string;
  institucion: string;
  idMovimiento: string;
  formularioEditar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movimientoServicio: MovimientoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private router: Router,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore,
    private ruta: ActivatedRoute
    ) { }

  ngOnInit() {
    this.editarFormulario();
    this.tiposMovimeintos = this.movimientoServicio.verTiposMoviemientos();
    this.movimientos = this.movimientoServicio.verMovimientos();
    this.estados = this.estadoServicio.verEstados();
    this.tiempo = new Date();
    this.esTiempo = false;
    this.esEstado = false;
    this.esTipo = false;
    this.usuario = localStorage.getItem('usuario');
    this.institucion = localStorage.getItem('instituto');
    this.idMovimiento  = this.ruta.snapshot.params['id'];
  }

  cambiarTiempo(){
    this.esTiempo = true;
  }

  cambiarTipo(){
    this.esTipo = true;
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  tenerFecha(){
    return this.personaServicio.obtenerFechaActual().fecha + ' ' +this.personaServicio.obtenerFechaActual().tiempo ;
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

  editarMovimiento(movimiento){

    let descripcion = this.formularioEditar.value.Descripcion;
    if(descripcion === ''){
      descripcion = movimiento.Descripcion;
    }

    let tipo = this.formularioEditar.value.Tipo;
    if(tipo === ''){
      tipo = movimiento.Tipo;
    }

    let monto = this.formularioEditar.value.Monto;
    if(monto === ''){
      monto = movimiento.Monto;
    }

    let fechaHora = new Date(this.formularioEditar.value.FechaHora);
    if (this.formularioEditar.value.FechaHora == '' ) {
      fechaHora = new Date();
    }

    this.database.doc('movimientos/' + this.idMovimiento).update({
      Descripcion: descripcion,
      Tipo: tipo,
      Monto: monto,
      FechaHora: fechaHora,
      Institucion: movimiento.Institucion,
      Estado: movimiento.Estado
    }).then(() => {
      this.mensajeServicio.exito('Actualizado','Movimiento ha sido actualizada con exito');
      this.router.navigate(['/movimientoDetalle', this.idMovimiento]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/movimientoDetalle', this.idMovimiento]);
    });
  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Descripcion : [''],
        Tipo : [''],
        Monto : [''],
        FechaHora : ['']
      }
    );
  }

}

