import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EstadoService } from 'src/app/services/estado.service';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  estados: Array<any> = new Array<any>();
  articulos: Array<any> = new Array<any>();
  edificios: Array<any> = new Array<any>();
  institucion:string;
  estado: string;
  edificio: string;
  formularioBuscar: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private articuloServicio: ArticuloService,
    private estadoServicio: EstadoService,
    private edificioServicio: EdificioService

  ) { }

  ngOnInit() {
    this.buscarFormulario();
    this.estados = this.estadoServicio.verEstados();
    this.articulos = this.articuloServicio.verArticulos();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
    this.estado = '01';
    this.edificio = '';
  }

  tenerEdificios(){
    let edificios: Array<any> = new Array<any>();
    this.edificios.forEach(data=>{
      if(data.Estado == '01' && data.Institucion == this.institucion){
        edificios.push(data);
      }
    });
    return edificios;
  }

  asignarEdificio(){
    this.edificio = this.formularioBuscar.value.Edificio;
  }

  asignarEstado(){
    this.estado = this.formularioBuscar.value.Estado;
  }

  filtrarArticulos(){
    let cadena = this.formularioBuscar.value.Articulo;
    let articulos = new Array<any>();

    if(cadena !== '') {
      this.articulos.forEach(
        (data) => {
          let info = data.Descripcion;
          if(data.Edificio == this.edificio && data.Estado == this.estado && data.Institucion == this.institucion){
            if(info.indexOf(cadena,0)===0){
              articulos.push(data);
            }
          }
        }
      );
    } else {
      this.articulos.forEach(
        (data) => {
          if(data.Estado == this.estado && data.Institucion == this.institucion && data.Edificio == this.edificio){
            articulos.push(data);
          }
        }
      );
    }
    return articulos;
  }

  tenerEstados(){
    let state = new Array<any>();
    this.estados.forEach(dato => {
      if (dato.iddominioestado === '00' || dato.iddominioestado === '09') {
        state.push(dato);
      }
    });
    return state
  }

  buscarFormulario(){
    this.formularioBuscar = this.formBuilder.group({
      Estado: [''],
      Articulo: [''],
      Edificio: ['']
    });
  }

}
