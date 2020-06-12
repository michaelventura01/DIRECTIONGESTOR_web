import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editcurso',
  templateUrl: './editcurso.component.html',
  styleUrls: ['./editcurso.component.css']
})
export class EditcursoComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  idCurso: string;
  esEstado: boolean;
  estado: string;
  esEdificio: boolean;
  edificio: string;
  esFechaInicio: boolean;
  fechaInicio: Date;
  fechaFin: Date;

  descripcion: string;
  tiempo: number;
  codigo: string;
  institucion: string;
  formularioCreado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore,
    private router: Router,
    private personaServicio: PersonaService,
    private spinner: NgxSpinnerService,
    private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.crearFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.cursos = this.cursoServicio.verCursos();
    this.idCurso = this.ruta.snapshot.params['id'];
    this.institucion = localStorage.getItem('instituto');
    this.esEstado = false;
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  editarCurso(curso){
    this.spinner.show();
    let hoy = new Date();
    this.descripcion = this.formularioCreado.value.Descripcion;
    this.codigo = curso.Codigo;
    this.estado = this.formularioCreado.value.Estado;
    this.tiempo = this.formularioCreado.value.Tiempo;

    if(this.descripcion == ''){
      this.descripcion = curso.Descripcion;
    }


    if(this.estado == ''){
      this.estado = curso.Estado;
    }
    if(this.tiempo == 0){
      this.tiempo = curso.Tiempo;
      if(this.tiempo<0){this.tiempo = (this.tiempo)*-1;}
    }


    this.database.doc('cursos/'+this.idCurso).update({
      Descripcion:this.descripcion,
      Codigo: this.codigo,
      Estado: this.estado,
      Institucion: this.institucion,
      Tiempo: this.tiempo,
      FechaAgregacion: this.obtenerFecha(curso.FechaAgregacion).date,
      FechaEdicion: hoy

    }).then(()=>{
      this.spinner.hide();
      this.mensajeServicio.exito('Actualizado','Curso ha sido actualizado con exito');
      this.router.navigate(['/cursoDetalle', this.idCurso]);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/cursoDetalle', this.idCurso]);
    });


  }


  tenerEstadosCursos(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '07') {
        state.push(dato);
      }
    });
    return state
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Codigo: [{value: '', disabled: true}],
        Descripcion: [''],
        Tiempo: [''],
        Estado: ['']
      }
    );
  }
}

