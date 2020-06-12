import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { MenuService } from 'src/app/services/menu.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})

export class AddusuarioComponent implements OnInit {
  @Input() accion: string;
  @Input() instituto: string;
  @Input() persona: string;

  usuarios: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  instituciones: Array<any> = new Array<any>();
  roles: Array<any> = new Array<any>();
  Rol: string;
  Usuario: string;
  user: string;
  Persona: string;
  Contraseña: string;
  esPersona: boolean;
  esUsuario: boolean;
  esPassword: boolean;
  esRol: boolean;
  esEncargado: boolean;


  formularioUsuario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioServicio: UsuarioService,
    private personaServicio: PersonaService,
    private estudianteServicio: EstudianteService,
    private empleadoServicio: EmpleadoService,
    private mensajeServicio: MensajeService,
    private institucionServicio: InstitucionService,
    private database: AngularFirestore,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
    this.Usuario =  "";
    this.esPersona = false;
    this.esUsuario = false;
    this.esPassword = false;
    this.esRol = false;

    this.usuarios = this.usuarioServicio.verUsuarios();
    this.roles = this.usuarioServicio.verRoles();
    this.personas = this.personaServicio.verPersonas();
    this.empleados = this.empleadoServicio.verEmpleados();
    this.estudiantes = this.estudianteServicio.verEstudiantes();
    this.usuarios =this.usuarioServicio.verUsuarios();
    this.instituciones = this.institucionServicio.verInstituciones();



    if(this.accion!='Encargado'){
      this.accion = 'Usuario';
      this.persona = "";
      this.esEncargado = false;


      this.instituto = localStorage.getItem('instituto');
      this.user = localStorage.getItem('usuario');

    }else{

      this.esEncargado = true;
    }
  }

  cargarPersonas(data, personas, empleados, estudiantes){
    let person = new Array<any>();
    let cadena = data.toLowerCase();

    if(cadena !== '') {
      personas.forEach(persona => {
        let nombreapellido = persona.Nombre + ' ' + persona.Apellido;
        empleados.forEach(empleado => {
          if((nombreapellido.indexOf(cadena, 0) !== -1) && persona.id === empleado.Persona && this.instituto === empleado.institucion){
            person.push(persona);
          }
        });
        estudiantes.forEach(estudiante =>{
          if((nombreapellido.indexOf(cadena, 0) !== -1) && persona.id === estudiante.Persona && this.instituto === estudiante.institucion){
            person.push(persona);
          }
        });
      });
    } else {
      personas.forEach(persona => {
        empleados.forEach(empleado => {
          if(persona.id === empleado.Persona && this.instituto === empleado.institucion){
            person.push(persona);
          }
        });
        estudiantes.forEach(estudiante =>{
          if(persona.id === estudiante.Persona && this.instituto === estudiante.institucion){
            person.push(persona);
          }
        });
      });
    }
    return person;
  }

  obtenerUsuario(codigoPersona, empleados, estudiantes, personas){
    let person = new Array<any>();
    let codigo = "";

    if(this.accion!='Encargado'){
      codigo = codigoPersona;
    }else{
      codigo = this.persona;
    }

    personas.forEach(persona => {
      empleados.forEach(empleado => {
        if( empleado.Persona === codigo){
          person.push(empleado);
        }
      });
      estudiantes.forEach(estudiante =>{
        if( estudiante.Persona === codigo){
          person.push(estudiante);
        }
      });
    });
    return person;
  }

  obtenerPersona(codigo){
    let person = new Array<any>();

      this.empleados.forEach(empleado => {
        if( empleado.Codigo === this.Usuario){
          person = (empleado);
        }
      });
      this.estudiantes.forEach(estudiante =>{
        if( estudiante.Codigo === this.Usuario){
          person = (estudiante);
        }
      });

    return person;
  }

  asignarUsuario(persona){

    persona.forEach(dato => {
      this.Usuario = dato.Codigo;

    })
  }

  buscarUsuario(user){
    let users = new Array<any>();
    this.usuarios.forEach(data => {
      if( data.Usuario === user ){
        users.push(data);
      }
    });
    return users;
  }

  tenerUsuario(user ,pass){
    let users: any;
    this.usuarios.forEach(data => {
      if( data.Usuario === user && data.Contraseña === pass){
        users = data;
      }
    });
    return users;
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

  tenerRol(data){
    let rango: any;

    this.roles.forEach(rol => {
      if(rol.id === data){
        rango = rol;
      }
    });

    return rango;

  }


  guardarUsuario(usuario){
    this.spinner.show();

    if(this.accion == 'Encargado'){
      this.Persona = this.persona;
    }else{
      this.Persona = this.formularioUsuario.value.Persona;
    }

    this.Contraseña = this.formularioUsuario.value.Password;
    this.Rol =  this.formularioUsuario.value.Rol;

    if(usuario !== this.Persona){
      this.esUsuario   = true;
    }else{
      this.esUsuario = false;
    }

    if(this.Persona === ''){
      this.esPersona = true;
    }else{
      this.esPersona = false;
    }

    if(this.Rol === ''){
      this.esRol = true;
    }else{
      this.esRol = false;
    }

    if(this.Contraseña === '' ){
      this.esPassword = true;
    }else{
      this.esPassword = false;
    }

    if(this.Contraseña !== this.formularioUsuario.value.rePassword ){
      this.esPassword = true;
    }else{
      this.esPassword = false;
    }

    if(this.accion == 'Encargado'){
      localStorage.clear();

    }

    if(!this.esPersona && !this.esUsuario && !this.esRol && !this.esPassword){
      if(this.buscarUsuario(this.Usuario).length<1){
        this.database.collection('usuarios').add(
          {
            Contraseña: btoa(this.Contraseña),
            Estado: "01",
            Institucion: this.instituto,
            Persona: this.Persona,
            Rol: this.Rol,
            Usuario: this.Usuario,
            fechaInicio: new Date()
          }
        ).then(()=>{
          this.spinner.hide();
          this.mensajeServicio.exitoSeguir('Guardado','Usuario ha sido agregada con exito');
          if(this.accion == 'Encargado'){
            this.router.navigate(['/']);
          }else{
            this.router.navigate(['/usuarios']);
          }
        }).catch(() => {
          this.spinner.hide();
          this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
          if(this.accion == 'Encargado'){
            this.router.navigate(['/institucionAgregar']);
            localStorage.clear();
          }else{
            this.router.navigate(['/usuarios']);
          }
        });
      }else{
        if(this.accion == 'Encargado'){
          this.spinner.hide();
          this.mensajeServicio.info('Registro Existente','Este usuario ya fue registrado anteriormente');
          this.router.navigate(['/']);
        }else{
          this.spinner.hide();
          this.mensajeServicio.info('Registro Existente','Este usuario ya fue registrado anteriormente');
          this.router.navigate(['/usuarios']);
        }
      }
    }
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  crearFormulario(){
    this.formularioUsuario = this.formBuilder.group(
    {
      personaBuscar: [''],
      Rol :[''],
      rePassword :['', Validators.compose([
        Validators.required,
        Validators.minLength(8)])
      ],
      Password :[ null, Validators.compose([
        Validators.required,
        Validators.minLength(8)])
     ],
      Usuario :[''],
      Persona:['']
    });
  }
}
