import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CursoService } from 'src/app/services/curso.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-addcursoasignatura',
  templateUrl: './addcursoasignatura.component.html',
  styleUrls: ['./addcursoasignatura.component.css']
})
export class AddcursoasignaturaComponent implements OnInit {
  formularioCreado: FormGroup;
  asignaturas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  cursosAsignaturas: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  asignatura: string;
  curso: string;

  constructor(
    private formBuilder: FormBuilder,
    private asignaturaServicio: AsignaturaService,
    private cursoServicio: CursoService,
    private router: Router,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore) { }

  ngOnInit() {
    this.crearFormulario();
    this.asignaturas = this.asignaturaServicio.verAsignaturas();
    this.cursos = this.cursoServicio.verCursos();
    this.cursosAsignaturas = this.cursoServicio.verCursosAsignaturas();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '01';
  }

  tenerAsignaturas(){
    let asignaturas: Array<any> = new Array<any>();
    this.asignaturas.forEach(asignatura => {
      if(asignatura.Estado == this.estado && asignatura.Institucion == this.institucion){
        asignaturas.push(asignatura);
      }
    });
    return asignaturas;
  }
  tenerCursos(){
    let cursos: Array<any> = new Array<any>();
    this.cursos.forEach(curso => {
      if(curso.Estado == this.estado && curso.Institucion == this.institucion){
        cursos.push(curso);
      }
    });
    return cursos;
  }

  guardarCursoAsignatura(anterior){
    this.asignatura = this.formularioCreado.value.Asignatura;
    this.curso = this.formularioCreado.value.Curso;

    if(!anterior){
      this.database.collection('cursosasignaturas').add({
        Institucion: this.institucion,
        Curso: this.curso,
        Asignatura: this.asignatura,
        Estado: '01'
      }).then(()=>{
      this.mensajeServicio.exito('Guardado','Asignatura ha sido agregado a Curso con exito');
      this.router.navigate(['/asignaturaCursos']);

    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/asignaturaCursos']);

    });
  }else{
    this.mensajeServicio.info('Registro Existente','Esta Asignatura fue agregada a este Curso anteriormente');
    this.router.navigate(['/asignaturaCursos']);

  }
  }

  buscarCursoAsignatura(){
    this.asignatura = this.formularioCreado.value.Asignatura;
    this.curso = this.formularioCreado.value.Curso;
    let cursoasignatura: any;
    this.cursosAsignaturas.forEach( data=>{
      if(data.Curso == this.curso && data.Asignatura == this.asignatura){
        cursoasignatura =data
      }
    });
    return cursoasignatura;
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Asignatura: ['', Validators.compose([Validators.required])],
      Curso: ['', Validators.compose([Validators.required])]
    });
  }

}
