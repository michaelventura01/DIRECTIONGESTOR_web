import { Component, OnInit } from '@angular/core';
import {InstitucionService } from 'src/app/services/institucion.service'
import { Instituciones } from 'src/model/instituciones';
import { ActivatedRoute } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';
import { EstadoService } from 'src/app/services/estado.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detailsinstitucion',
  templateUrl: './detailsinstitucion.component.html',
  styleUrls: ['./detailsinstitucion.component.css']
})
export class DetailsinstitucionComponent implements OnInit {
  idInstitucion : string;
  instituciones: Array<any> = new Array<any>();
  institucion: Instituciones = new Instituciones();
  tipoTelefonos: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  rol: string;
  esEditor: boolean;

  constructor(
    private institucionServicio : InstitucionService,
    private idinstituto: ActivatedRoute,
    private contactoServicio: ContactoService,
    private estadoServicio: EstadoService) {

      this.idInstitucion = this.idinstituto.snapshot.params['id'];

  }

  ngOnInit() {
    this.instituciones = this.institucionServicio.verInstitucion(this.idInstitucion);
    this.estados = this.estadoServicio.verEstados();
    this.tipoTelefonos = this.contactoServicio.tipoTelefonos();
    this.rol = localStorage.getItem('rol');
    switch(this.rol){
      case 'adm':{
        this.esEditor = true;
        break;
      }
      case 'dev':{
        this.esEditor = true;
        break;
      }
      case 'dir':{
        this.esEditor = true;
        break;
      }
      default: {
        this.esEditor = false;
        break;
      }
    }

  }




}


/**/
