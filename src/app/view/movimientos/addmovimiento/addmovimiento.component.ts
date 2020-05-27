import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addmovimiento',
  templateUrl: './addmovimiento.component.html',
  styleUrls: ['./addmovimiento.component.css']
})
export class AddmovimientoComponent implements OnInit {
  movimientos: Array<any> = new Array<any>();
  tiposMovimeintos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  tiempo: Date;
  esTiempo: boolean;
  usuario: string;
  institucion: string;
  formularioCreado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movimientoServicio: MovimientoService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private router: Router,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore
    ) { }

  ngOnInit() {
    this.crearFormulario();
    this.tiposMovimeintos = this.movimientoServicio.verTiposMoviemientos();
    this.movimientos = this.movimientoServicio.verMovimientos();
    this.tiempo = new Date();
    this.esTiempo = false;
    this.usuario = localStorage.getItem('usuario');
    this.institucion = localStorage.getItem('instituto');
  }

  cambiarTiempo(){
    this.esTiempo = true;
  }

  tenerFecha(){
    return this.personaServicio.obtenerFechaActual().fecha + ' ' +this.personaServicio.obtenerFechaActual().tiempo ;
  }

  guardarMovimiento(){
    let descripcion = this.formularioCreado.value.Descripcion;
    let tipo = this.formularioCreado.value.Tipo;
    let monto = this.formularioCreado.value.Monto;
    let fechaHora = new Date(this.formularioCreado.value.FechaHora);
    if (this.formularioCreado.value.FechaHora == '' ) {
      fechaHora = new Date();
    }

    this.database.collection('movimientos').add({
      Descripcion: descripcion,
      Tipo: tipo,
      Monto: monto,
      FechaHora: fechaHora,
      Institucion: this.institucion,
      Estado: '01'
    }).then(()=>{
      this.mensajeServicio.exito('Guardado','Movimiento ha sido agregado con exito');
      this.router.navigate(['/movimientos']);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/movimientos']);
    });
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Descripcion : ['', Validators.compose([Validators.required])],
        Tipo : ['', Validators.compose([Validators.required])],
        Monto : ['', Validators.compose([Validators.required])],
        FechaHora : ['']
      }
    );
  }
}
