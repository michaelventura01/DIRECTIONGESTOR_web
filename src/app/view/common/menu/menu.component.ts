import { Component, OnInit } from '@angular/core';
import {Tiempo, MenuService} from 'src/app/services/menu.service';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonaService } from 'src/app/services/persona.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  tiempoActual$: Observable<Tiempo>;
  tiempo: Date = new Date();
  hora: number;
  minuto: string;
  segundo: string;
  dia: string;
  fecha: string;
  meridiano: string;
  anio: string;
  usuario: string;
  esUsuario: boolean;

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

  personas: Array<any> = new Array<any>();
  instituciones: Array<any> = new Array<any>();
  usuarios: Array<any> = new Array<any>();

  constructor(
    private fechaTiempo: MenuService,
    private usuarioServicio: UsuarioService,
    private personaServicio: PersonaService,
    private institucionServicio: InstitucionService,
    private spinner: NgxSpinnerService,
    private router: Router) { }


  ngOnInit() {

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);

    this.usuario = localStorage.getItem('usuario');

    if(localStorage.getItem('usuario')){
      this.esUsuario = true;
    }else{
      this.esUsuario = false;
    }

    if(localStorage.getItem('usuario')){
      this.usuario = localStorage.getItem('usuario');
      this.rol = localStorage.getItem('rol');
      this.esUsuario = true;

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
          this.tenerTarea = false;
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
          this.tenerTarea = false;
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
    }

    this.tiempoActual$=this.fechaTiempo.getInfoReloj();
    this.tiempoActual$.subscribe(x => {
      this.hora = x.horA;
      this.minuto = x.minutO;
      this.dia = x.diaSemanA;
      this.fecha = x.diaMeS;
      this.meridiano = x.meridianO;
      this.segundo = x.segundO;
    });
    this.anio = this.tiempo.getFullYear().toString();
    this.personas = this.personaServicio.verPersonas();
    this.instituciones = this.institucionServicio.verInstituciones();
    this.usuarios = this.usuarioServicio.verUsuarios();

  }

  recargar(){
    localStorage.setItem('parar','stop');
    if(!localStorage.getItem('parar')){
      location.reload();
    }
  }

  tenerInstitucion(data){
    let instituto: any;
    this.usuarios.forEach(usuario => {
      if(data === usuario.Usuario){
        this.instituciones.forEach(institucion => {
          if(usuario.Institucion === institucion.id){
            instituto = institucion.Nombre;
          }
        });
      }
    });
    return instituto;
  }

  tenerNombre(data){
    let persona: any;
    this.usuarios.forEach(usuario => {
      if(data === usuario.Usuario){
        this.personas.forEach(persona => {
          if(usuario.Persona === persona.id){
            console.log(persona);
            persona = persona ;
          }
        });
      }
    });
    return persona;
  }

  tenerRol(data){
    let instituto: any;
    this.usuarios.forEach(usuario => {
      if(data === usuario.Usuario){
        this.personas.forEach(persona => {
          if(usuario.Persona === persona.id){
            instituto = persona.Nombre;
          }
        });
      }
    });
    return instituto;
  }

}
