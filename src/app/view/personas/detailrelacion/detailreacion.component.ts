import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PersonaService } from 'src/app/services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  templateUrl: './detailreacion.component.html',
  styleUrls: ['./detailreacion.component.css']
})
export class DetailreacionComponent implements OnInit {

  personas: Array<any> = new Array<any>();
  ciudades: Array<any> = new Array<any>();
  paises: Array<any> = new Array<any>();
  estados: Array<any> = new Array<any>();
  relaciones: Array<any> = new Array<any>();
  tiposrelaciones: Array<any> = new Array<any>();
  idRelacion: string;
  esTipo: boolean;
  esResidencia: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFirestore,
    private personaServicio: PersonaService,
    private direccionServicio: DireccionService,
    private router: Router,
    private ruta: ActivatedRoute,
    private estadoServicio: EstadoService,
    private mensajeServicio: MensajeService) { }

  ngOnInit() {
    this.idRelacion = this.ruta.snapshot.params.id;
    this.personas = this.personaServicio.verPersonas();
    this.tiposrelaciones = this.personaServicio.verTiposRelaciones();
    this.relaciones = this.personaServicio.verRelaciones();
    this.estados = this.estadoServicio.verEstados();
    this.paises = this.direccionServicio.verPaises();
    this.ciudades = this.direccionServicio.verCiudadesAll();
    this.esTipo = false;
    this.esResidencia = false;
  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  eliminarRelacion(relacion) {
    let fecha = new Date();
    this.database.doc('relaciones/' + relacion.id).update({
      Persona: relacion.Persona,
      TipoRelacion: relacion.TipoRelacion,
      Relacionado: relacion.Relacionado,
      Residencia: relacion.Residencia,
      Estado: '',
      FechaAgregacion: this.obtenerFecha(relacion.FechaAgregacion).time,
      FechaModificacion: fecha
    }).then(() => {
      this.mensajeServicio.exito('Elminado', 'Relacion ha sido eliminada con exito');
      this.router.navigate(['/personaDetalle', relacion.Persona]);
  }).catch(() => {
    this.mensajeServicio.error('Error', 'Ha ocurrido un error no esperado');
    this.router.navigate(['/personaDetalle', relacion.Persona ]);
  });

  }

}
