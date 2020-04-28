import { Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoService } from 'src/app/services/estado.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsusuario',
  templateUrl: './detailsusuario.component.html',
  styleUrls: ['./detailsusuario.component.css']
})
export class DetailsusuarioComponent implements OnInit {

  instituciones: Array<any> = Array<any>();
  personas: Array<any> = Array<any>();
  estudiantes: Array<any> = Array<any>();
  empleados: Array<any> = Array<any>();
  usuarios: Array<any> = Array<any>();
  estados: Array<any> = Array<any>();
  roles: Array<any> = Array<any>();
  user: string;
  rol: string;
  esRol: boolean;
  idUsuario: string;

  constructor(
    private institucionServicio: InstitucionService,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private usuarioServicio: UsuarioService,
    private estadoServicio: EstadoService,
    private router: Router,
    private ruta: ActivatedRoute
  ) {
    this.idUsuario = this.ruta.snapshot.params['id'];
  }

  ngOnInit() {
    this.user = localStorage.getItem('usuario');
    this.rol = localStorage.getItem('rol');
    this.instituciones = this.institucionServicio.verInstituciones();
    this.personas = this.personaServicio.verPersonas();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.usuarios = this.usuarioServicio.verUsuarios();
    this.estados = this.estadoServicio.verEstados();
    this.roles = this.usuarioServicio.verRoles();


    switch(this.rol){
      case 'adm':{
        this.esRol = true
        break;
      }
      case 'dev':{
        this.esRol = true
        break;
      }
      case 'dir':{
        this.esRol = true
        break;
      }
      case 'est':{
        this.esRol = false
        break;
      }
      case 'prof':{
        this.esRol = false
        break;
      }
      case 'tec':{
        this.esRol = true
        break;
      }
    }
  }

  tenerUsuario(data){
    let usuario: any;
    this.usuarios.forEach(user =>{
      if(user.Usuario === data){
        usuario = user
      }
    });
    return usuario;
  }

  tenerUsuarios(usuario){

    let users = new Array<any>();
    this.usuarios.forEach(user => {
      if(usuario.Institucion === user.Institucion){
        users.push(user);
      }
    });

    return users;
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  editarUsuario(data){
    this.router.navigate(['/usuarioEditar', data]);
  }



}
