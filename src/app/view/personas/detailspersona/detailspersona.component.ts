import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-detailspersona',
  templateUrl: './detailspersona.component.html',
  styleUrls: ['./detailspersona.component.css']
})
export class DetailspersonaComponent implements OnInit {
  idPersona: string;
  personas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  tipoTelefonos: Array<any> = new Array<any>();


  constructor(
    private personaServicio: PersonaService,
    private persona: ActivatedRoute,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private contactoServicio: ContactoService,
    private router: Router,
  ) {
    this.idPersona = this.persona.snapshot.params['id'];

  }

  ngOnInit() {



    this.personas = this.personaServicio.verPersona(this.idPersona);
    this.estados = this.estadoServicio.verEstados();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.sexos = this.personaServicio.verSexos();
    this.tipoTelefonos = this.contactoServicio.tipoTelefonos();
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  verPersona() {
    this.router.navigate(['/personaEditar', this.idPersona]);
  }

}
