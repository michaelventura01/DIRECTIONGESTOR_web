
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-editcursoasignatura',
  templateUrl: './editcursoasignatura.component.html',
  styleUrls: ['./editcursoasignatura.component.css']
})
export class EditcursoasignaturaComponent implements OnInit {
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  esEstado: boolean;
  curso: string;
  esCurso: boolean;
  asignatura: string;
  esAsignatura: boolean;
  idCursoAsignatura: string;
  formularioEditar: FormGroup;

  constructor(
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService,
    private ruta: ActivatedRoute,
    private database: AngularFirestore,
    private router: Router,
    private mensajeServicio: MensajeService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editarFormulario();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.estados = this.estadoServicio.verEstados();
    this.cursosAsignaturas = this.cursoServicio.verCursosAsignaturas();
    this.institucion = localStorage.getItem('instituto');
    this.idCursoAsignatura = this.ruta.snapshot.params['id'];
    this.esAsignatura = false;
    this.esEstado = false;
    this.esCurso = false;
  }

  buscarCursoAsignatura(){
    this.asignatura = this.formularioEditar.value.Asignatura;
    this.curso = this.formularioEditar.value.Curso;
    let cursoasignatura: any;
    this.cursosAsignaturas.forEach( data=>{
      if(data.Curso == this.curso && data.Asignatura == this.asignatura){
        cursoasignatura =data
      }
    });
    return cursoasignatura;
  }

  tenerAsignaturas(){
    let asignaturas: Array<any> = new Array<any>();
    this.asignaturas.forEach(asignatura => {
      if(asignatura.Estado == '01' && asignatura.Institucion == this.institucion){
        asignaturas.push(asignatura);
      }
    });
    return asignaturas;
  }

  cambiarAsignatura(){
    this.esAsignatura = true;
  }

  tenerEstados(){
    let estados = new Array<any>();
    this.estados.forEach(estado => {
      if(estado.iddominioestado === '00'){
        estados.push(estado);
      }
    });
    return estados;

  }

  asignarEstado(){
    this.estado = this.formularioEditar.value.Estado;
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  tenerCursos(){
    let cursos = new Array<any>();
    this.cursos.forEach(curso => {
      if(curso.Estado === '01' && curso.Institucion === this.institucion){
        cursos.push(curso);
      }
    });
    return cursos;
  }

  asignarCurso(){
    this.curso = this.formularioEditar.value.Curso;
  }

  cambiarCurso(){
    this.esCurso = true;
  }

  editarCursoAsignatura(cursoasignatura){

    this.estado = this.formularioEditar.value.Estado;
    if(this.estado===''){
      this.estado = cursoasignatura.Estado;
    }
    this.asignatura = this.formularioEditar.value.Asignatura;
    if(this.asignatura===''){
      this.asignatura = cursoasignatura.Asignatura;
    }
    this.curso = this.formularioEditar.value.Curso;
    if(this.curso===''){
      this.curso = cursoasignatura.Curso;
    }

    if(this.esAsignatura || this.esCurso){
      if(this.buscarCursoAsignatura()){
        this.database.doc('cursosasignaturas/'+this.idCursoAsignatura).update({
          Institucion: this.institucion,
          Curso: this.curso,
          Asignatura: this.asignatura,
          Estado: this.estado
        }).then(()=>{
          this.mensajeServicio.exito('Actualizado','Asignatura de Curso ha sido actualizado con exito');
          this.router.navigate(['/cursoAsignaturaDetalle', this.idCursoAsignatura]);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/cursoAsignaturaDetalle', this.idCursoAsignatura]);
        });
      }else{

        this.database.doc('cursosasignaturas/'+this.idCursoAsignatura).update({
          Institucion: this.institucion,
          Curso: cursoasignatura.Curso,
          Asignatura: cursoasignatura.Asignatura,
          Estado: this.estado
        }).then(()=>{
          this.mensajeServicio.exito('Actualizado','Asignatura de Curso ha sido actualizado con exito');
          this.router.navigate(['/cursoAsignaturaDetalle', this.idCursoAsignatura]);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/cursoAsignaturaDetalle', this.idCursoAsignatura]);
        });

      }
    }else{
      this.database.doc('cursosasignaturas/'+this.idCursoAsignatura).update({
        Institucion: this.institucion,
        Curso: this.curso,
        Asignatura: this.asignatura,
        Estado: this.estado
      }).then(()=>{
        this.mensajeServicio.exito('Actualizado','Asignatura de Curso ha sido actualizado con exito');
        this.router.navigate(['/cursoAsignaturaDetalle', this.idCursoAsignatura]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/cursoAsignaturaDetalle', this.idCursoAsignatura]);
      });
    }
  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
    {
      Asignatura: [''],
      Curso: [''],
      Estado: ['']
    });
  }

}
