import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EdificioService } from 'src/app/services/edificio.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-detailedificio',
  templateUrl: './detailedificio.component.html',
  styleUrls: ['./detailedificio.component.css']
})
export class DetailedificioComponent implements OnInit {
  idEdificio: string;
  edificios: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();


  constructor(
    private ruta: ActivatedRoute,
    private edificioServicio: EdificioService,
    private direccionServicio: DireccionService,
    private estadoServicio: EstadoService
    ) { }

  ngOnInit() {
    this.idEdificio = this.ruta.snapshot.params['id'];
    this.estados = this.estadoServicio.verEstados();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.edificios = this.edificioServicio.verEdificios();
  }

  tenerEdificios(){
    let edificios: Array<any> = new Array<any>();
    this.edificios.forEach(data => {
      if(this.idEdificio === data.id){
        edificios.push(data);
      }
    });

    return edificios;
  }

}
