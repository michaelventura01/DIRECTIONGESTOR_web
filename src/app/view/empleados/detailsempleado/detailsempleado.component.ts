import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-detailsempleado',
  templateUrl: './detailsempleado.component.html',
  styleUrls: ['./detailsempleado.component.css']
})
export class DetailsempleadoComponent implements OnInit {
  idEmpleado: string;
  personas: Array<any> = new Array<any>();
  empleados: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  sexos: Array<any> = new Array<any>();
  tiposTelefonos: Array<any> = new Array<any>();

  puestosTrabajos: Array<any> = new Array<any>();

  constructor(
    private empleado: ActivatedRoute,
    private personaServicio: PersonaService,
    private estadoServicio: EstadoService,
    private direccionServicio: DireccionService,
    private contactoServicio: ContactoService,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {
    this.idEmpleado = this.empleado.snapshot.params['id'];
  }

  ngOnInit() {
    this.sexos = this.personaServicio.verSexos();
    this.empleados = this.empleadoService.verEmpleado(this.idEmpleado);
    this.personas = this.personaServicio.verPersonas();
    this.estados = this.estadoServicio.verEstados();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.paises = this.direccionServicio.verPaises();
    this.puestosTrabajos = this.empleadoService.verPuestosTrabajos();
    this.tiposTelefonos = this.contactoServicio.tipoTelefonos();
  }

  tenerEdad(data){
    return this.personaServicio.obtenerFecha(data);
  }

  editarEmpleado(data){
    this.router.navigate(['/empleadoEditar',data]);
  }

  verPersona(data){
    this.router.navigate(['/personaDetalle',data]);
  }


}
