import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { EstadoService } from 'src/app/services/estado.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { CurrencyPipe } from '@angular/common';

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
    private estudianteService: EstudianteService,
    private spinner: NgxSpinnerService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router
  ) {

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
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  tenerEdad(data){
    return this.personaServicio.obtenerFecha(data);
  }

  eliminarEStudiante(data){

    this.spinner.show();

    let estudiante: any;
    if(data.fechaFin){
      estudiante = {
        Codigo: data.Codigo,
        Estado: '',
        Mensualidad: data.Mensualidad,
        institucion: data.institucion,
        fechaInicio: this.obtenerFecha(data.fechaInicio).time,
        fechaFin: this.obtenerFecha(data.fechaFin).time,
        fechaAgregacion: this.obtenerFecha(data.fechaAgregacion).time,
        fechaModificacion: new Date(),
        Persona: data.Persona
      }
    }else{
      estudiante = {
        Codigo: data.Codigo,
        Estado: '',
        Mensualidad: data.Mensualidad,
        institucion: data.institucion,
        fechaInicio: this.obtenerFecha(data.fechaInicio).time,
        fechaAgregacion: this.obtenerFecha(data.fechaAgregacion).time,
        fechaModificacion: new Date(),
        Persona: data.Persona
      }
    }


    this.database.doc('estudiantes/'+data.id).update(estudiante).then(()=>{
      this.spinner.hide();
      this.mensajeServicio.exito('Eliminado','Estudiante ha sido eliminado con exito');
      this.router.navigate(['/estudiantes']);
    }).catch(() => {
      this.spinner.hide();
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/estudiantes']);
    });


  }

  obtenerFecha(data){
    return this.personaServicio.obtenerFecha(data);
  }

  imprimirEstudiantePDF(estudent){
    let hoy = new Date();

    let doc = new jsPDF('portrait', 'px', 'a4');

    doc.setFontSize(18);
    doc.setTextColor(100);
    doc.text(35, 20, 'Ficha Estudiantil');

    doc.setFontSize(12);
    doc.setTextColor(130);
    doc.text(360, 20, hoy.getDate() + ' / ' + (hoy.getMonth() + 1) + ' / ' + hoy.getFullYear());

    doc.setTextColor(150);
    doc.setLineWidth(0.5);
    doc.line(15, 23, 430, 23);

    doc.setTextColor(100);
    doc.setFontSize(13);
    doc.text(35, 60, 'Nombres:');
    doc.text(205, 60, 'Apellidos:');
    doc.text(360, 60, 'Edad:');
    doc.text(35, 110, 'Fecha de Nacimiento:');
    doc.text(205, 110, 'Nacionalidad:');
    doc.text(360, 110, 'Sexo:');
    doc.text(35, 160, 'Correo:');
    doc.text(250, 160, 'Telefono:');
    doc.text(35, 210, 'Direccion:');
    doc.text(250, 210, 'Ciudad:');
    doc.text(35, 260, 'Pais:');
    doc.text(35, 310, 'Codigo:');
    doc.text(250, 310, 'Mensualidad:');
    doc.text(35, 360, 'Fecha de Inicio:');
    if(estudent.fechaFin){
      doc.text(250, 360, 'Fecha de Finalizacion:');
    }


    doc.setTextColor(60);
    doc.setFontSize(14);

    let etudiant: any;

    this.estudiantes.forEach(estudiante => {
      if(estudiante.id === estudent.id){

        this.personas.forEach(persona => {
          if(persona.id === estudiante.Persona){

            this.sexos.forEach(sexo => {
              if(sexo.id === persona.Sexo){

                this.paises.forEach(pais => {
                  if(pais.id === persona.Nacionalidad){

                    this.tiposTelefonos.forEach(tipo => {
                      if(tipo.id === persona.TipoTelefono){
                        this.estados.forEach(estado => {
                          if(estado.id === persona.Estado){

                            etudiant = {
                              Codigo : estudiante.Codigo,
                              FechaNacimiento: persona.FechaNacimiento,
                              Estado: estado.descripcion,
                              Sexo: sexo.descripcion,
                              Nacionalidad: pais.nacionalidad,
                              Nombre: persona.Nombre,
                              Apellido: persona.Apellido,
                              fechaInicio: estudiante.fechaInicio,
                              fechaFin: estudiante.fechaFin,
                              Direccion: persona.Direccion,
                              Ciudad: persona.Ciudad,
                              Pais: persona.Pais,
                              Correo: persona.Correo,
                              Telefono: persona.Telefono,
                              TipoTelefono: tipo.descripcion,
                              Mensualidad: estudiante.Mensualidad
                            }
                          }
                        });

                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });

    console.log(etudiant);
    doc.text(35, 75, etudiant.Nombre.toUpperCase());
    doc.text(205, 75, etudiant.Apellido.toUpperCase());
    doc.text(360, 75, this.obtenerFecha(etudiant.FechaNacimiento).edad.toUpperCase());
    doc.text(35, 125, this.obtenerFecha(etudiant.FechaNacimiento).fechaNacimiento.toUpperCase());
    doc.text(205, 125, etudiant.Nacionalidad.toUpperCase());
    doc.text(360, 125, etudiant.Sexo.toUpperCase());
    doc.text(35, 175, etudiant.Correo);
    doc.text(250, 175,  '(' + etudiant.Telefono.slice(0, 3) + ') ' + etudiant.Telefono.slice(3, 6) + ' - ' + etudiant.Telefono.slice(6, 10));
    doc.text(35, 225, etudiant.Direccion.toUpperCase());
    this.ciudades.forEach( ciudad => {
      if ( ciudad.id === etudiant.Ciudad ) {
        doc.text(250, 225, ciudad.descripcion.toUpperCase());
      }
    });
    this.paises.forEach( pais => {
      if ( pais.id === etudiant.Pais ) {
        doc.text(35, 275, pais.descripcion.toUpperCase());
      }
    });

    doc.text(35, 325, etudiant.Codigo.toUpperCase());
    doc.text(250, 325, '$'+etudiant.Mensualidad+'.00');
    doc.text(35, 375, this.obtenerFecha(etudiant.fechaInicio).fechaNacimiento.toUpperCase());
    if(estudent.fechaFin){
      doc.text(250, 375, this.obtenerFecha(etudiant.fechaFin).fechaNacimiento.toUpperCase());
    }
 
    let width = 35;


    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.setLineWidth(0.5);
    doc.line(15, 610, 430, 610);
    doc.text(35, 620, localStorage.getItem('tituloFooter').toUpperCase());
    doc.text(220, 620, '1');
    doc.text(385, 620, 'Direction Gestor');




    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.setLineWidth(0.5);
    doc.line(15, 610, 430, 610);
    doc.text(35, 620, localStorage.getItem('tituloFooter').toUpperCase());
    doc.text(385, 620, 'Direction Gestor');

    doc.output('dataurlnewwindow');

    // Save the PDF
    // doc.save(persona.Nombre + ' ' + persona.Apellido + ' Ficha Estudiantil');

  }

}
