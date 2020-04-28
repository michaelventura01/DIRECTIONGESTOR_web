

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editusuario',
  templateUrl: './editusuario.component.html',
  styleUrls: ['./editusuario.component.css']
})

export class EditusuarioComponent implements OnInit {

  Persona: string;
  Usuario: string;
  Rol: string;
  Estado: string;
  Password: string;
  esRol: boolean;
  esEstado: boolean;
  esPassword: boolean;
  esRePassword: boolean;
  idUsuario: string;
  usuarios: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  roles:   Array<any> = new Array<any>();
  esEditarRol: boolean;
  esEditarEstado: boolean;
  formularioEditar: FormGroup;
  Institucion: string;
  user: string;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioServicio: UsuarioService,
    private estadoServicio: EstadoService,
    private personaServicio: PersonaService,
    private ruta: ActivatedRoute,
    private router: Router,
    private mensajeServicio: MensajeService,
    private database: AngularFirestore) {
      this.idUsuario = this.ruta.snapshot.params['id'];
     }

  ngOnInit() {
    this.crearFormulario();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.roles = this.usuarioServicio.verRoles();
    this.usuarios = this.usuarioServicio.verUsuarios();

    this.user = localStorage.getItem('usuario');

    this.esEditarRol = false;
    this.esEditarEstado = false;
    this.esPassword = false;
    this.esRePassword = false;
    this.esEstado = false;
    this.esRol = false;

  }

  asignarCambioRol(usuario){
    if(usuario.Usuario !== this.user){
      this.esEditarRol = true
    }

  }
  asignarCambioEstado(){
    this.esEditarEstado = true;
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  tenerEstados(){
    let estados = new Array<any>();
    this.estados.forEach(
      estado => {
        if(estado.iddominioestado === '00' || estado.iddominioestado === '01'){
          estados.push(estado)

        }
      }
    );
    return estados;
  }

  editarUsuario(data){

    this.Persona = data.Persona;
    this.Usuario = data.Usuario;
    this.Institucion =  data.Institucion;

    if(this.formularioEditar.value.Password !== ''){


      if(this.formularioEditar.value.Password.length < 8){
        this.esPassword = true;
      }else{
        this.Password = btoa(this.formularioEditar.value.Password);
        this.esPassword = false;
      }

      if(this.formularioEditar.value.Password !== this.formularioEditar.value.rePassword){
        this.esRePassword = true;
      }else{
        this.esRePassword = false;
      }
    }else{

      this.Password = data.Contraseña;
    }


    if(this.esEditarRol){
      if(this.formularioEditar.value.Rol!=''){
        this.Rol = this.formularioEditar.value.Rol;
        this.esRol = false;
      }else{
        this.esRol = true;
      }

    }else{
      this.Rol = data.Rol;
    }

    if(this.esEditarEstado){

      if(this.formularioEditar.value.Estado!=''){
        this.Estado = this.formularioEditar.value.Estado;
        this.esEstado = false;
      } else {
        this.esEstado = true;
      }



    }else{
      this.Estado = data.Estado;
    }



    if(!this.esRePassword && !this.esPassword && !this.esRol && !this.esEstado){
      if(this.Estado === '01'){

        this.database.doc('usuarios/'+this.idUsuario).update({
          Contraseña: this.Password,
          Estado: this.Estado,
          Institucion: this.Institucion,
          Persona: this.Persona,
          Rol: this.Rol,
          Usuario: this.Usuario,
          fechaInicio: this.tenerFecha(data.fechaInicio).time
        }).then(()=>{
          this.mensajeServicio.exito('Actualizado','Usuario ha sido actualizado con exito');
          this.router.navigate(['/usuarioDetalle', this.idUsuario]);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/usuarioDetalle', this.idUsuario]);
        });

      }else{

        this.database.doc('usuarios/'+this.idUsuario).update({
          Contraseña: this.Password,
          Estado: this.Estado,
          Institucion: this.Institucion,
          Persona: this.Persona,
          Rol: this.Rol,
          Usuario: this.Usuario,
          fechaInicio: this.tenerFecha(data.fechaInicio).time,
          fechaFin: new Date()
        }).then(()=>{
          this.mensajeServicio.exito('Actualizado','Usuario ha sido actualizado con exito');
          this.router.navigate(['/usuarioDetalle', this.idUsuario]);
        }).catch(() => {
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          this.router.navigate(['/usuarioDetalle', this.idUsuario]);
        });



      }



    }
  }

  tenerUsuario(){
    let usuario: Array<any> = Array<any>();
    this.usuarios.forEach(contenido => {
      if(this.idUsuario === contenido.id){
        usuario.push(contenido);
      }
    });
    return usuario;
  }

  crearFormulario(){
    this.formularioEditar = this.formBuilder.group(
    {
      rePassword :['' ],
      Password  :['', Validators.compose([
        Validators.required,
        Validators.minLength(8)])
      ],
      Rol :[''],
      Estado :['']

    });
  }
}
