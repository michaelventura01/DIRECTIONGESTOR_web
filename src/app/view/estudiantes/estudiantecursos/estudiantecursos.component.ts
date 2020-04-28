import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-estudiantecursos',
  templateUrl: './estudiantecursos.component.html',
  styleUrls: ['./estudiantecursos.component.css']
})
export class EstudiantecursosComponent implements OnInit {

  estudiantes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cursos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  periodos: Array<any> = new Array<any>();
  cursosEstudiantes: Array<any> = new Array<any>();
  usuario: string;
  institucion: string;
  estado: string;
  curso: string;
  periodo: string;
  formularioBuscar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estudianteServicio: EstudianteService,
    private cursoServicio: CursoService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private periodoServicio: PeriodoService
  ) { }

  ngOnInit() {
    this.crearBuscador();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.cursos = this.cursoServicio.verCursos();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.periodos = this.periodoServicio.verPeriodos();
    this.cursosEstudiantes = this.cursoServicio.verCursosEstudiantes();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '01';
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

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
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

  tenerPeriodos(){
    let periodos = new Array<any>();
    this.periodos.forEach(periodo => {
      if(periodo.Estado === '01' && periodo.Institucion === this.institucion){
        periodos.push(periodo);
      }
    });
    return periodos;
  }

  asignarCurso(){
    this.curso = this.formularioBuscar.value.Curso;
  }

  asignarPeriodo(){
    this.periodo = this.formularioBuscar.value.Periodo;
  }

  filtrarCursosEstudiantes(){
    let cadena = this.formularioBuscar.value.Buscador;
    let cursosestudiantes = new Array<any>();

    if(cadena !== '') {

      this.cursosEstudiantes.forEach(cursoestudiante => {
        if(cursoestudiante.Institucion == this.institucion && cursoestudiante.Estado == this.estado && cursoestudiante.Curso == this.curso && cursoestudiante.Periodo == this.periodo){
          this.estudiantes.forEach(estudiante =>{
            if(estudiante.id === cursoestudiante.Estudiante && estudiante.institucion == this.institucion){
              this.personas.forEach(persona=>{
                let info = persona.Nombre+' '+persona.Apellido;
                if(persona.id === estudiante.Persona && info.indexOf(cadena, 0) === 0){
                  this.cursos.forEach(curso=>{
                    if(cursoestudiante.Curso === curso.id && curso.Institucion == this.institucion){
                      this.periodos.forEach(periodo=>{
                        if(periodo.id == cursoestudiante.Periodo){
                          cursosestudiantes.push({
                            Nombre: persona.Nombre,
                            Apellido: persona.Apellido,
                            CodigoEstudiante: estudiante.Codigo,
                            Curso: curso.Descripcion,
                            CodigoCurso: curso.Codigo,
                            Periodo: periodo.Descripcion,
                            CodigoPeriodo: periodo.Codigo,
                            Estado: cursoestudiante.Estado,
                            id: cursoestudiante.id
                           });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      })

    } else {

      this.cursosEstudiantes.forEach(cursoestudiante => {
        if(cursoestudiante.Institucion == this.institucion && cursoestudiante.Estado == this.estado && cursoestudiante.Curso == this.curso && cursoestudiante.Periodo == this.periodo){
          this.estudiantes.forEach(estudiante =>{
            if(estudiante.id === cursoestudiante.Estudiante && estudiante.institucion == this.institucion){
              this.personas.forEach(persona=>{
                if(persona.id === estudiante.Persona){
                  this.cursos.forEach(curso=>{
                    if(cursoestudiante.Curso === curso.id && curso.Institucion == this.institucion){
                      this.periodos.forEach(periodo=>{
                        if(periodo.id == cursoestudiante.Periodo){
                          cursosestudiantes.push({
                            Nombre: persona.Nombre,
                            Apellido: persona.Apellido,
                            CodigoEstudiante: estudiante.Codigo,
                            Curso: curso.Descripcion,
                            CodigoCurso: curso.Codigo,
                            Periodo: periodo.Descripcion,
                            CodigoPeriodo: periodo.Codigo,
                            Estado: cursoestudiante.Estado,
                            id: cursoestudiante.id
                           });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      })

    }

    return cursosestudiantes;
  }



  crearBuscador(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Curso: [''],
      Periodo: [''],
      Buscador: ['']
    });

  }

}
