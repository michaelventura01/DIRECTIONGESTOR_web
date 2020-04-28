import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-detailsArticulo',
  templateUrl: './detailsArticulo.component.html',
  styleUrls: ['./detailsArticulo.component.css']
})
export class DetailsArticuloComponent implements OnInit {
  idArticulo: string;
  usuario: string;
  estados: Array<any> = new Array<any>();
  articulos: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  institucion:string;


  constructor(
    private articuloServicio: ArticuloService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService,
    private ruta: ActivatedRoute,
    private personaServicio: PersonaService,
    private direccionServicio: DireccionService
  ) { }

  ngOnInit() {
    this.estados = this.estadoServicio.verEstados();
    this.articulos = this.articuloServicio.verArticulos();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.idArticulo = this.ruta.snapshot.params['id'];
    this.paises = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.usuario = localStorage.getItem('usuario');
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

}
