import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AsignaturaService } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-editasignatura',
  templateUrl: './editasignatura.component.html',
  styleUrls: ['./editasignatura.component.css']
})
export class EditasignaturaComponent implements OnInit {
  formularioEditar: FormGroup;
  estados: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  idAsignatura: string;
  esEstado: boolean;
  estado: string;
  descripcion: string;
  tiempo: number;
  codigo: string;
  institucion: string;

  constructor(
    private formBuilder: FormBuilder,
    private asignaturaServicio: AsignaturaService,
    private estadoServicio: EstadoService,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore,
    private router: Router,
    private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.crearFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.idAsignatura = this.ruta.snapshot.params['id'];
    this.institucion = localStorage.getItem('instituto');
    this.esEstado = false;
  }

  crearFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Codigo:[{value:'', disabled: true}],
        Descripcion:[''],
        Estado:[''],
        Tiempo: ['']
      }
    );
  }

  cambiarEstado(){
    this.esEstado = true;
  }


  tenerEstadosAsignaturas(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '05') {
        state.push(dato);
      }
    });
    return state
  }

  editarAsignatura(asignatura)
  {
    this.descripcion = this.formularioEditar.value.Descripcion;
    this.codigo = asignatura.Codigo;
    this.estado = this.formularioEditar.value.Estado;
    this.tiempo = this.formularioEditar.value.Tiempo;

    if(this.descripcion == ''){
      this.descripcion = asignatura.Descripcion;
    }


    if(this.estado == ''){
      this.estado = asignatura.Estado;
    }
    if(this.tiempo == 0){
      this.tiempo = asignatura.Tiempo;
      if(this.tiempo<0){this.tiempo = (this.tiempo)*-1;}
    }

    this.database.doc('asignaturas/'+this.idAsignatura).update({
      Descripcion:this.descripcion,
      Codigo: this.codigo,
      Estado: this.estado,
      Institucion: this.institucion,
      Tiempo: this.tiempo
    }).then(()=>{
      this.mensajeServicio.exito('Actualizado','Asignatura ha sido actualizado con exito');
      this.router.navigate(['/asignaturaDetalle', this.idAsignatura]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/asignaturaDetalle', this.idAsignatura]);
    });

  }



}
