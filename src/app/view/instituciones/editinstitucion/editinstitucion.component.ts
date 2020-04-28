import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Instituciones} from 'src/model/instituciones';
import { Router, ActivatedRoute } from '@angular/router';
import { InstitucionService } from 'src/app/services/institucion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { EstadoService } from 'src/app/services/estado.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-editinstitucion',
  templateUrl: './editinstitucion.component.html',
  styleUrls: ['./editinstitucion.component.css']
})
export class EditinstitucionComponent implements OnInit {
  instituciones: Array<Instituciones> = new Array<Instituciones>();
  tipoTelefonos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  formularioInstitucion: FormGroup;
  idInstitucion: string;

  Correo: string;
  Descripcion: string;
  Estado: string;
  Nombre: string;
  Telefono: string;
  TipoTelefono: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private database: AngularFirestore,
    private contactoServicio: ContactoService,
    private estadoServicio: EstadoService,
    private idinstituto: ActivatedRoute,
    private institucionServicio: InstitucionService,
    private mensajeServicio: MensajeService) {
      this.idInstitucion = this.idinstituto.snapshot.params['id'];
    }

  ngOnInit() {
    this.editarFormulario();
    this.tipoTelefonos = this.contactoServicio.tipoTelefonos();
    this.estados = this.estadoServicio.verEstados();
    this.instituciones = this.institucionServicio.verInstitucion(this.idInstitucion);


  }

  editarInstitucion(data){
    let mensaje;

    if(this.formularioInstitucion.value.Nombre == ''){
      this.Nombre = data.Nombre;
    }else{
      this.Nombre = this.formularioInstitucion.value.Nombre;
    }

    if(this.formularioInstitucion.value.Descripcion == ''){
      this.Descripcion = data.Descripcion;
    }else{
      this.Descripcion = this.formularioInstitucion.value.Descripcion;
    }

    if(this.formularioInstitucion.value.TipoTelefono == ""){
      this.TipoTelefono = data.TipoTelefono;
    }else{
      this.TipoTelefono = this.formularioInstitucion.value.TipoTelefono;
    }

    if(this.formularioInstitucion.value.Telefono == ''){
      this.Telefono = data.Telefono;
    }else{
      this.Telefono = this.formularioInstitucion.value.Telefono;
    }

    if(this.formularioInstitucion.value.Correo == ''){
      this.Correo = data.Correo;
    }else{
      this.Correo = this.formularioInstitucion.value.Correo;
    }

    if(this.formularioInstitucion.value.Estado == ''){
      this.Estado = data.Estado;
    }else{
      this.Estado = this.formularioInstitucion.value.Estado;
    }

    this.database.doc('instituciones/'+this.idInstitucion).update({
      Correo: this.Correo,
      Descripcion: this.Descripcion,
      Estado: this.Estado,
      Nombre: this.Nombre,
      Telefono: this.Telefono,
      TipoTelefono: this.TipoTelefono
    }).then(()=>{
      this.mensajeServicio.exito('Actualizado','Institucion ha sido actualizada con exito');
      this.router.navigate(['/institucionDetalle', this.idInstitucion]);
    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/']);
    });

  }

  verInstitucion() {
    this.router.navigate(['/institucionDetalle', this.idInstitucion]);
  }

  tenerEstadosInstituciones(data){
    let states = new Array<any>();
    data.forEach(elemento => {
      if(elemento.iddominioestado === '00' ){
        states.push(elemento);
      }
    });
    this.estados = new Array<any>();
    this.estados = states;
    return this.estados;

  }

  editarFormulario(){
    this.formularioInstitucion = this.formBuilder.group(
      {
        Estado: ['', Validators.compose([Validators.required])],
        Correo: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        Telefono: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
        ])],
        TipoTelefono: ['', Validators.compose([Validators.required])],
        Descripcion: ['', Validators.compose([Validators.required])],
        Nombre: ['', Validators.compose([Validators.required])]
      }
    );
  }


  buscarInstitucion(dato){

    let cadena = dato;
    let nombre;
    let data =  this.institucionServicio.verInstituciones();

    let instituto = new Array<any>();
    let respuesta;

    this.instituciones.forEach(
      (data) => {
        let nombre = data.nombre;
        if(nombre === cadena){
          instituto.push(data);
        }
      }
    );

    if(instituto.length>0){
      respuesta = false;
    }else{
      respuesta = true;
    }

    return {
      respuesta: respuesta,
      instituto: dato
    };
  }





}
