import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instituciones } from 'src/model/instituciones';
import {ContactoService} from 'src/app/services/contacto.service';
import {EstadoService} from 'src/app/services/estado.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MensajeService} from 'src/app/services/mensaje.service';
import { AddpersonaComponent } from '../../personas/addpersona/addpersona.component';
import { Router } from '@angular/router';

import { InstitucionService } from 'src/app/services/institucion.service';
@Component({
  selector: 'app-addinstitucion',
  templateUrl: './addinstitucion.component.html',
  styleUrls: ['./addinstitucion.component.css']
})
export class AddinstitucionComponent implements OnInit {
  //instituciones: Array<Instituciones> = new Array<Instituciones>();
  tipoTelefono: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  instituciones: Array<any> = new Array<any>();
  formularioInstitucion: FormGroup;
  visibleComponente: boolean;
  estatus: string;
  instituto: string;
  idInstitucion: string;

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private contactoServicio: ContactoService,
    private estadoServicio: EstadoService,
    private router: Router,
    private institutoServicio: InstitucionService,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {
    this.crearFormulario();
    this.visibleComponente = true;
    this.tipoTelefono = this.contactoServicio.tipoTelefonos();
    this.estados = this.estadoServicio.verEstados();
    this.instituciones = this.institutoServicio.verInstituciones();
    this.estatus = 'Encargado';
    this.visibleComponente = true;
    localStorage.clear();

  }

  agregarInstitucion(){
      if(this.buscarInstitucion(this.formularioInstitucion.value.Nombre)){
        this.database.collection('instituciones').add(
        {
          Correo: this.formularioInstitucion.value.Correo,
          Descripcion: this.formularioInstitucion.value.Descripcion,
          Estado: "01",
          Nombre: this.formularioInstitucion.value.Nombre,
          Telefono: this.formularioInstitucion.value.Telefono,
          TipoTelefono: this.formularioInstitucion.value.TipoTelefono
        }
        ).then(()=>{
        this.mensajeServicio.exito('Guardado','Institucion ha sido agregada con exito');
        this.instituto = JSON.stringify(this.formularioInstitucion.value);
        this.visibleComponente = false;
        this.estatus = "Encargado";

      }).catch(() => {
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/']);

      });
    }else{
      this.mensajeServicio.info('Ya Existe','Esta institucion ya fue creada anteriormente');
        this.router.navigate(['/']);
    }
  }

  buscarInstitucion(dato){

    let cadena = dato;
    let data = this.instituciones;
    let instituto = new Array<any>();
    let respuesta;

    this.instituciones.forEach(
      (data) => {
        let nombre = data.Nombre;
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

    return respuesta;
  }



  crearFormulario(){
    this.formularioInstitucion = this.formBuilder.group(
      {
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
}
