import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailscuenta',
  templateUrl: './detailscuenta.component.html',
  styleUrls: ['./detailscuenta.component.css']
})
export class DetailscuentaComponent implements OnInit {

  tipos: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  cuentas: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  institucion: string;
  usuario: string;
  idCuenta: string;

  constructor(
    private cuentaServicio: CuentaService,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private ruta: ActivatedRoute
    ) { }

  ngOnInit() {
    this.institucion = localStorage.getItem('instituto');
    this.usuario = localStorage.getItem('usuario');
    this.tipos = this.cuentaServicio.verTipoCuentas();
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.institucion = localStorage.getItem('instituto');
    this.cuentas = this.cuentaServicio.verCuentas();
    this.idCuenta = this.ruta.snapshot.params['id'];
  }

  tenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

}
