import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { database } from 'firebase';

@Component({
  selector: 'app-detailsaula',
  templateUrl: './detailsaula.component.html',
  styleUrls: ['./detailsaula.component.css']
})
export class DetailsaulaComponent implements OnInit {

  idAula: string;
  usuario: string;
  paises: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  aulas: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();


  constructor(
    private ruta: ActivatedRoute,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService

  ) {

  }

  ngOnInit() {
    this.idAula = this.ruta.snapshot.params['id'],
    this.usuario = localStorage.getItem('usuario');
    this.paises  = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.estados = this.estadoServicio.verEstados();
    this.aulas = this.edificioServicio.verAulas();
    this.edificios = this.edificioServicio.verEdificios();
  }

  tenerEdificio(aula){
    let edificio: any;
    this.edificios.forEach(data=>{
      if(aula.Edificio === data.id){
        edificio = data;
      }
    });
    return edificio;
  }

}
