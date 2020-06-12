import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { EstadoService } from 'src/app/services/estado.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addasignatura',
  templateUrl: './addasignatura.component.html',
  styleUrls: ['./addasignatura.component.css']
})
export class AddasignaturaComponent implements OnInit {
  estados: Array<any> = Array<any>();
  asignaturas: Array<any> = Array<any>();
  formularioCreado: FormGroup;
  codigo: string;
  descripcion: string;
  estado: string;
  institucion: string;
  tiempo: number;

  constructor(
    private formBuilder: FormBuilder,
    private asignaturaServicio: AsignaturaService,
    private estadoServicio: EstadoService,
    private mensajeServicio: MensajeService,
    private database :  AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.crearFormulario();
   }

  ngOnInit() {
    this.crearFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.estados = this.estadoServicio.verEstados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    console.log(this.estados);
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Codigo:['', Validators.compose([Validators.required])],
        Descripcion:['', Validators.compose([Validators.required])],
        Tiempo:['', Validators.compose([Validators.required])]
      }
    );
  }

  tenerEstadosCursos(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '05') {
        state.push(dato);
      }
    });
    return state
  }

  buscarAsignaturas(){
    let curso: any;
    this.codigo = this.formularioCreado.value.Codigo;
    this.asignaturas.forEach( data=>{
      if(data.Codigo == this.codigo.toLowerCase() && data.Institucion == this.institucion){
        curso =data
      }
    });
    return curso;
  }

  agregarAsignatura(asignaturaAnterior)
  {
    this.spinner.show();
    let hoy = new Date();
    this.codigo = this.formularioCreado.value.Codigo.toLowerCase();
    this.descripcion = this.formularioCreado.value.Descripcion;
    this.tiempo = this.formularioCreado.value.Tiempo;
    if(this.tiempo<0){this.tiempo = (this.tiempo)*-1;}
    this.estado = '01';

    if(!asignaturaAnterior){
      this.database.collection('asignaturas').add({
        Descripcion:this.descripcion,
        Codigo: this.codigo,
        Estado: this.estado,
        Institucion: this.institucion,
        Tiempo: this.tiempo,
        FechaAgregacion: hoy
      }).then(()=>{
        this.spinner.hide();
      this.mensajeServicio.exito('Guardado','Asignatura ha sido agregada con exito');
      this.router.navigate(['/asignaturas']);

    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/asignaturas']);

    });
  }else{
    this.spinner.hide();
    this.mensajeServicio.info('Registro Existente','Una Asignatura con ese codigo ha sido agregado anteriormente');
    this.router.navigate(['/asignaturas']);

  }

  }

}
