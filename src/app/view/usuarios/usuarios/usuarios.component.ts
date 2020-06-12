import { Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  instituciones: Array<any> = Array<any>();
  personas: Array<any> = Array<any>();
  estudiantes: Array<any> = Array<any>();
  empleados: Array<any> = Array<any>();
  usuarios: Array<any> = Array<any>();
  estados: Array<any> = Array<any>();
  roles: Array<any> = Array<any>();
  formularioBuscar: FormGroup;
  usuario: string;
  Estado: string;

  constructor(
    private institucionServicio: InstitucionService,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private usuarioServicio: UsuarioService,
    private estadoServicio: EstadoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.buscarFormulario();
    this.usuario = localStorage.getItem('usuario');
    this.instituciones = this.institucionServicio.verInstituciones();
    this.personas = this.personaServicio.verPersonas();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.usuarios = this.usuarioServicio.verUsuarios();
    this.estados = this.estadoServicio.verEstados();
    this.roles = this.usuarioServicio.verRoles();
    this.Estado = '01';
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

  buscarUsuarios(){
    this.Estado = this.formularioBuscar.value.Estado;
    let cadena = this.formularioBuscar.value.Buscador.toLowerCase();
    let users = new Array<any>();
    if(cadena !== '') {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          if(nombreapellido.indexOf(cadena, 0) !== -1){
            this.tenerUsuarios(this.tenerUsuario(this.usuario)).forEach(user =>{
              if(user.Persona === data.id){
                users.push(user);
              }
            });
          }
        }
      );
    } else {
      this.personas.forEach(
        (data) => {
          let nombreapellido = data.Nombre + ' ' + data.Apellido;
          this.tenerUsuarios(this.tenerUsuario(this.usuario)).forEach(user =>{
            if(user.Persona === data.id){
              users.push(user);
            }
          });
        }
      );
    }
    return users;
  }


  tenerUsuarios(usuario){
    if(this.Estado === ''){this.Estado = '01';}

    let users = new Array<any>();
    this.usuarios.forEach(user => {
      if(usuario.Institucion === user.Institucion && user.Estado === this.Estado && user.Usuario !== this.usuario){
        users.push(user);
      }
    });
    return users;
  }

  tenerEstados(){
    let states = new Array<any>();
    this.estados.forEach(
      estado => {
        if(estado.iddominioestado === '00' || estado.iddominioestado === '01'){
          states.push(estado);
        }
      }
    );

    return states;
  }

  verUsuario(data){
    this.router.navigate(['/usuarioDetalle', data]);
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Buscador: [''],
      Estado: ['']
    });

  }



}
