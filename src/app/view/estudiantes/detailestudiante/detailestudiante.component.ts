import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-detailestudiante',
  templateUrl: './detailestudiante.component.html',
  styleUrls: ['./detailestudiante.component.css']
})
export class DetailestudianteComponent implements OnInit {

  idEstudiante: string;
  personas: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  tiposTelefonos: Array<any> = new Array<any>();


  constructor(
    private ruta: ActivatedRoute,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private contactoServicio: ContactoService,
    private estudianteService: EstudianteService
  ) {

  }

  tenerEdad(data){
    return this.personaServicio.obtenerFecha(data);
  }

  ngOnInit() {
    this.idEstudiante = this.ruta.snapshot.params['id'];
    this.sexos = this.personaServicio.verSexos();
    this.estudiantes = this.estudianteService.verEstudiantes();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.tiposTelefonos = this.contactoServicio.tipoTelefonos();
  }

}
