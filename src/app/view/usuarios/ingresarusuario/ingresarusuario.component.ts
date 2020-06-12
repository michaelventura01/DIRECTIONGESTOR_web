import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore} from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ingresarusuario',
  templateUrl: './ingresarusuario.component.html',
  styleUrls: ['./ingresarusuario.component.css']
})
export class IngresarusuarioComponent implements OnInit {

  esCorrecto : boolean;
  esActivo: boolean;
  personas: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  instituciones: Array<any> = new Array<any>();
  roles: Array<any> = new Array<any>();

  formularioIngreso: FormGroup;
  usuarios: Array<any> = new Array<any>();

  constructor(
    private formBuilder: FormBuilder,
    private usuarioServicio: UsuarioService,
    private personaServicio: PersonaService,
    private institutoServicio: InstitucionService,
    private mensajeServicio: MensajeService,
    private empleadoServicio: EmpleadoService,
    private estudianteServicio: EstudianteService,
    private router: Router,
    private spinner: NgxSpinnerService

    ) {

  }

  ngOnInit() {
    this.crearFormulario();
    this.usuarios = this.usuarioServicio.verUsuarios();
    this.personas = this.personaServicio.verPersonas();
    this.instituciones = this.institutoServicio.verInstituciones();
    this.roles = this.usuarioServicio.verRoles();
    this.empleados = this. empleadoServicio.verEmpleados();
    this.estudiantes = this.estudianteServicio.verEstudiantes();

    this.esCorrecto = true;
    this.esActivo = true;


  }

  tenerRol(data){
    let rango: any;

    this.roles.forEach(rol => {
      if(rol.id === data){
        rango = rol;
      }
    });

    return rango;

  }



  tenerEmpleadoEstudiante(usuario){

    let persona : any;

    this.empleados.forEach(empleado => {
      if(usuario = empleado.Codigo && empleado.Estado == '01'){
        persona = empleado
      }
    });

    this.estudiantes.forEach(estudiante => {
      if(usuario == estudiante.Codigo && estudiante.Estado == '01'){
        persona = estudiante
      }
    });
    return persona;
  }


  tenerInstitucion(data){
    let instituto: any;
    this.instituciones.forEach(institucion => {
      if(data === institucion.id){
        instituto = institucion;
      }
    });

    return instituto;

  }

  tenerPersona(data){

    let person: any;
    this.personas.forEach(persona => {
      if(persona.id === data){
        person = persona;
      }
    });

    return person;

  }

  ingresar( ){

    let control:string = this.formularioIngreso.value.Name;
    let pass: string = this.formularioIngreso.value.Password;
    let user: any;

    this.usuarios.forEach(usuario =>{
      if(usuario.Usuario === control.toLowerCase() && usuario.Contraseña === btoa(pass)){
        user = usuario
      }
    });


    if(user){
      this.spinner.show();
      this.esCorrecto = true;

      if(user.Estado == '01' && this.tenerInstitucion(user.Institucion).Estado == '01' && this.tenerEmpleadoEstudiante(user.Usuario).Estado == '01' ){
        this.esActivo = true;
        localStorage.clear();
        localStorage.setItem('usuario', user.Usuario);
        localStorage.setItem('iusuariod', user.id);
        localStorage.setItem('instituto', user.Institucion);
        let titulo = this.tenerPersona(user.Persona).Nombre+' '+this.tenerPersona(user.Persona).Apellido[0]+' - '+this.tenerRol(user.Rol).descripcion;
        localStorage.setItem('tituloUsuario', titulo);
        localStorage.setItem('tituloFooter', this.tenerInstitucion(user.Institucion).Nombre);
        localStorage.setItem('rol',user.Rol);

        titulo = 'HOLA '+this.tenerPersona(user.Persona).Nombre.toUpperCase()+' '+this.tenerPersona(user.Persona).Apellido.toUpperCase();
        this.spinner.hide();
        this.mensajeServicio.exitoSeguir(titulo,'Su usuario ha sido validado con exito');
        this.router.navigate(['/menu']);
      }else{
        this.esActivo = false;
      }

    }else{
      this.esCorrecto = false;
    }

  }

  /*


  */

  crearFormulario(){
    this.formularioIngreso = this.formBuilder.group(
    {
      Name:['', Validators.compose([Validators.required])],
      Password :['', Validators.compose([Validators.required])]
    });
  }
}
