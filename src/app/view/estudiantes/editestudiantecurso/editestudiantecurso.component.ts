
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { CursoService } from 'src/app/services/curso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PeriodoService } from 'src/app/services/periodo.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-editestudiantecurso',
  templateUrl: './editestudiantecurso.component.html',
  styleUrls: ['./editestudiantecurso.component.css']
})
export class EditestudiantecursoComponent implements OnInit {
  estudiantes: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cursosEstudiantes: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  estudiante: string;
  curso: string;
  periodo: string;
  idEstudianteCurso: string;
  esCurso: boolean;
  esPeriodo: boolean;
  esEstado: boolean;
  formularioEditar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteServicio: EstudianteService,
    private cursoServicio: CursoService,
    private periodoServicio: PeriodoService,
    private estadoServicio: EstadoService,
    private router: Router,
    private mensajeServicio: MensajeService,
    private personaServicio: PersonaService,
    private ruta: ActivatedRoute,
    private database: AngularFirestore) { }

  ngOnInit() {
    this.editarFormulario();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.cursos = this.cursoServicio.verCursos();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.periodos = this.periodoServicio.verPeriodos();
    this.cursosEstudiantes = this.cursoServicio.verCursosEstudiantes();
    this.institucion = localStorage.getItem('instituto');
    this.idEstudianteCurso = this.ruta.snapshot.params['id'];
    this.esCurso= false;
    this.esPeriodo= false;
    this.esEstado= false;
    this.curso = '';
    this.periodo = '';
    this.estado = '';
  }

  cambiarCurso(){
    this.esCurso = true;
  }

  cambiarPeriodo(){
    this.esPeriodo = true;
  }

  cambiarEstado(){
    this.esEstado = true;
  }

  tenerEstudiantes(){
    let estudiantes: Array<any> = new Array<any>();
    this.estudiantes.forEach(estudiante => {
      if(estudiante.Estado == this.estado && estudiante.Institucion == this.institucion ){
        estudiantes.push(estudiante);
      }
    });
    return estudiantes;
  }

  tenerEstados(){
    let estados = new Array<any>();
    this.estados.forEach(estado => {
      if(estado.iddominioestado === '00' || estado.iddominioestado === '03'){
        estados.push(estado);
      }
    });
    return estados;
  }

  tenerCursos(){
    let cursos: Array<any> = new Array<any>();
    this.cursos.forEach(curso => {
      if(curso.Estado == '01' && curso.Institucion == this.institucion){
        cursos.push(curso);
      }
    });
    return cursos;
  }

  tenerPeriodos(){
    let periodos: Array<any> = new Array<any>();
    this.periodos.forEach(periodo => {
      if(periodo.Estado == '01' && periodo.Institucion == this.institucion){
        periodos.push(periodo);
      }
    });
    return periodos;
  }

  buscarCursoEstudiante(){
    this.estudiante = this.formularioEditar.value.Estudiante;
    this.curso = this.formularioEditar.value.Curso;
    this.periodo = this.formularioEditar.value.Periodo;
    let cursoestudiante: any;
    this.cursosEstudiantes.forEach( data=>{
      if(data.Curso == this.curso && data.Estudiante == this.estudiante && this.periodo === data.Periodo && this.institucion === data.Institucion){
        cursoestudiante =data
      }
    });
    return cursoestudiante;
  }

  editarEstudianteCurso(cursosestudiante){

    if(!this.buscarCursoEstudiante()){

      this.periodo = this.formularioEditar.value.Periodo;
      if(this.formularioEditar.value.Periodo === ''){
        this.periodo = cursosestudiante.Periodo;
      }
      this.estado = this.formularioEditar.value.Estado;
      if(this.formularioEditar.value.Estado === ''){
        this.estado = cursosestudiante.Estado;
      }
      this.curso = this.formularioEditar.value.Curso;
      if(this.formularioEditar.value.Curso === ''){
        this.curso = cursosestudiante.Curso;
      }

      this.database.doc('estudiantescursos/'+this.idEstudianteCurso).update({
        Institucion: this.institucion,
        Curso: this.curso,
        Estudiante: cursosestudiante.Estudiante,
        Estado: this.estado,
        Periodo: this.periodo
      }).then(()=>{
        this.mensajeServicio.exito('Actualizado','Estudiante de Curso ha sido actualizado con exito');
        this.router.navigate(['/estudianteCursoDetalle', this.idEstudianteCurso]);
      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/estudianteCursoDetalle', this.idEstudianteCurso]);
      });
    }else{
      this.mensajeServicio.info('No Actualizado','Estudiante de Curso No pudo ser actualizado');
        this.router.navigate(['/estudianteCursoDetalle', this.idEstudianteCurso]);
    }
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  editarFormulario(){
    this.formularioEditar = this.formBuilder.group(
      {
        Estudiante: [{value:'', disabled: true}],
        Curso: [''],
        Estado: [''],
        Periodo: ['']
      }
    );
  }


}
