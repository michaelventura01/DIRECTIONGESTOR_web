import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';
import { InstitucionService } from 'src/app/services/institucion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  instituciones: Array<any> = new Array<any>();
  usuario: string;
  instituto: string;
  tituloUsuario: string;
  rol: string;
  tenerAula: boolean;
  tenerCurso: boolean;
  tenerEstudiante: boolean;
  tenerEmpleado: boolean;
  tenerPersona: boolean;
  tenerAsignatura: boolean;
  tenerArticulo: boolean;
  tenerFinanza: boolean;
  tenerCuenta: boolean;
  tenerUsuario: boolean;
  tenerTarea: boolean;
  tenerInicio: boolean;
  esUsuario: boolean;
  tenerOtrasOpciones: boolean;
  idUsuario: string;
  nombreInstitucion: string;





  constructor(
    private mensajeServicio: MensajeService,
    private institucionServicio: InstitucionService,
    private router: Router) { }

  ngOnInit() {
    this.instituciones = this.institucionServicio.verInstituciones();

    if(localStorage.getItem('usuario')){
      this.tituloUsuario = localStorage.getItem('tituloUsuario');
      this.usuario = localStorage.getItem('usuario');
      this.instituto = localStorage.getItem('instituto');
      this.rol = localStorage.getItem('rol');
      this.idUsuario = localStorage.getItem('iusuariod');
      this.esUsuario = true;
      this.nombreInstitucion = localStorage.getItem('tituloFooter');


      switch(this.rol){
        case 'adm': {
          this.tenerAula = true;
          this.tenerCurso = true;
          this.tenerEstudiante = true;
          this.tenerEmpleado = true;
          this.tenerPersona = true;
          this.tenerAsignatura = true;
          this.tenerArticulo = true;
          this.tenerFinanza = true;
          this.tenerCuenta = true;
          this.tenerUsuario = true;
          this.tenerTarea = true;
          this.tenerInicio = true;
          this.tenerOtrasOpciones = true;
          break;
        }
        case 'dev': {
          this.tenerInicio = true;
          this.tenerAula = true;
          this.tenerCurso = true;
          this.tenerEstudiante = true;
          this.tenerEmpleado = true;
          this.tenerPersona = true;
          this.tenerAsignatura = true;
          this.tenerArticulo = true;
          this.tenerFinanza = true;
          this.tenerCuenta = true;
          this.tenerUsuario = true;
          this.tenerTarea = true;
          this.tenerOtrasOpciones = true;
          break;
        }
        case 'dir': {
          this.tenerInicio = true;
          this.tenerAula = true;
          this.tenerCurso = true;
          this.tenerEstudiante = true;
          this.tenerEmpleado = true;
          this.tenerPersona = true;
          this.tenerAsignatura = true;
          this.tenerArticulo = true;
          this.tenerFinanza = true;
          this.tenerCuenta = true;
          this.tenerUsuario = true;
          this.tenerTarea = true;
          this.tenerOtrasOpciones = true;
          break;
        }
        case 'est': {
          this.tenerInicio = true;
          this.tenerAula = true;
          this.tenerCurso = false;
          this.tenerEstudiante = true;
          this.tenerEmpleado = false;
          this.tenerPersona = false;
          this.tenerAsignatura = false;
          this.tenerArticulo = false;
          this.tenerFinanza = false;
          this.tenerCuenta = false;
          this.tenerUsuario = false;
          this.tenerTarea = true;
          this.tenerOtrasOpciones = true;
          break;
        }
        case 'prof': {
          this.tenerInicio = true;
          this.tenerAula = true;
          this.tenerCurso = true;
          this.tenerEstudiante = true;
          this.tenerEmpleado = true;
          this.tenerPersona = true;
          this.tenerAsignatura = true;
          this.tenerArticulo = true;
          this.tenerFinanza = false;
          this.tenerCuenta = false;
          this.tenerUsuario = false;
          this.tenerTarea = true;
          this.tenerOtrasOpciones = true;
          break;
        }
        case 'tec': {
          this.tenerInicio = true;
          this.tenerAula = true;
          this.tenerCurso = true;
          this.tenerEstudiante = true;
          this.tenerEmpleado = true;
          this.tenerPersona = true;
          this.tenerAsignatura = true;
          this.tenerArticulo = true;
          this.tenerFinanza = true;
          this.tenerCuenta = true;
          this.tenerUsuario = true;
          this.tenerTarea = true;
          this.tenerOtrasOpciones = true;
          break;
        }
        default: {
          this.tenerInicio = false;
          this.tenerAula = false;
          this.tenerCurso = false;
          this.tenerEstudiante = false;
          this.tenerEmpleado = false;
          this.tenerPersona = false;
          this.tenerAsignatura = false;
          this.tenerArticulo = false;
          this.tenerFinanza = false;
          this.tenerCuenta = false;
          this.tenerUsuario = false;
          this.tenerTarea = false;
          this.tenerOtrasOpciones = false;
        }
      }
    } else {
      this.tenerInicio = false;
      this.tenerAula = false;
      this.tenerCurso = false;
      this.tenerEstudiante = false;
      this.tenerEmpleado = false;
      this.tenerPersona = false;
      this.tenerAsignatura = false;
      this.tenerArticulo = false;
      this.tenerFinanza = false;
      this.tenerCuenta = false;
      this.tenerUsuario = false;
      this.tenerTarea = false;
      this.esUsuario = false;
      this.tenerOtrasOpciones = false;
    }
  }

  tenerInstitucion(){
    let instituto: any;
    this.instituciones.forEach(
      data => {
        if(data.id === this.instituto){
          instituto = data.Nombre;
        }
      }
    );
    return instituto;
  }


  salirUsuario(){
    localStorage.clear();
    this.tenerInicio = false;
    this.tenerAula = false;
    this.tenerCurso = false;
    this.tenerEstudiante = false;
    this.tenerEmpleado = false;
    this.tenerPersona = false;
    this.tenerAsignatura = false;
    this.tenerArticulo = false;
    this.tenerFinanza = false;
    this.tenerCuenta = false;
    this.tenerUsuario = false;
    this.tenerTarea = false;
    this.esUsuario = false;
    this.tenerOtrasOpciones = false;

    this.mensajeServicio.exitoSeguir('Session Finalizada', 'Ha Finalizado Su Session');
    this.router.navigate(['/']);

  }




}
