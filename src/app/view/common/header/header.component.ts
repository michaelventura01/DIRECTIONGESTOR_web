import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';
import { InstitucionService } from 'src/app/services/institucion.service';
import { TareaService } from 'src/app/services/tarea.service';
import { PersonaService } from 'src/app/services/persona.service';
import { MenuService, Tiempo } from 'src/app/services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tiempoActual$: Observable<Tiempo>;
  tiempo: Date = new Date();
  hora: number;
  minuto: string;
  segundo: string;
  dia: string;
  fecha: string;
  meridiano: string;
  anio: string;
  instituciones: Array<any> = new Array<any>();
  tareas: Array<any> = new Array<any>();
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
  esMensaje: boolean;
  hour: number;

  constructor(
    private mensajeServicio: MensajeService,
    private institucionServicio: InstitucionService,
    private tareaServicio: TareaService,
    private personaServicio: PersonaService,
    private menuServicio: MenuService,
    private router: Router) { }

  ngOnInit() {
    this.instituciones = this.institucionServicio.verInstituciones();
    this.esMensaje = false;

    if (localStorage.getItem('usuario')) {
      this.esMensaje = true;
      this.tituloUsuario = localStorage.getItem('tituloUsuario');
      this.usuario = localStorage.getItem('usuario');
      this.instituto = localStorage.getItem('instituto');
      this.rol = localStorage.getItem('rol');
      this.idUsuario = localStorage.getItem('iusuariod');
      this.esUsuario = true;
      this.nombreInstitucion = localStorage.getItem('tituloFooter');
      this.tareas = this.tareaServicio.verTareas();

      this.tiempoActual$ = this.menuServicio.getInfoReloj();
      this.tiempoActual$.subscribe(x => {
        this.hora = x.horA;
        this.minuto = x.minutO;

        if (!this.esMensaje) {
          if ((this.hour % 12).toString() !== this.hora.toString()) {
            this.esMensaje = true;
          }else{
            this.esMensaje = false;
          }
        }


      });





      switch (this.rol) {
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

  ocultarMensaje(tiempo) {
    let time = new Date(tiempo.seconds * 1000);
    this.hour = time.getHours();
    this.esMensaje = false;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerFechaActual() {
    return this.personaServicio.obtenerFechaActual() ;
  }

  tenerTareas() {
    let tareas = new Array<any>();
    this.tareas.forEach(tarea => {
      if ( tarea.Institucion === this.instituto && tarea.Asignado === this.usuario
        && this.tenerFechaActual().mesAno === this.tenerFecha(tarea.FechaHora).mesAno) {
        tareas.push(tarea);
      }
    });

    return tareas;
  }



  verAsignacion(id){
    this.esMensaje = false;
    this.router.navigate(['/tareaDetalle', id] );
  }

  tenerInstitucion(){
    let instituto: any;
    this.instituciones.forEach(
      data => {
        if (data.id === this.instituto) {
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
