import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonaService } from 'src/app/services/persona.service';
@Component({
  selector: 'app-addcurso',
  templateUrl: './addcurso.component.html',
  styleUrls: ['./addcurso.component.css']
})
export class AddcursoComponent implements OnInit {
  cursos: Array<any> = new Array<any>();
  formularioCreado: FormGroup;
  institucion: string;
  descripcion: string;
  estado: string;
  tiempo: number;
  codigo: string;

  constructor(
    private formBuilder: FormBuilder,
    private cursoServicio: CursoService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.crearFormulario();
    this.institucion = localStorage.getItem('instituto');
    this.cursos = this.cursoServicio.verCursos();
  }

  agregarCurso(){
    this.spinner.show();
    let hoy = new Date();
    this.descripcion = this.formularioCreado.value.Descripcion;
    this.estado = '01'
    this.tiempo = this.formularioCreado.value.Tiempo;
    if(this.tiempo<0){this.tiempo = (this.tiempo)*-1;}
    this.codigo = this.formularioCreado.value.Codigo.toLowerCase();

    if(!this.buscarCursos()){
        this.database.collection('cursos').add({
          Descripcion:this.descripcion,
          Codigo: this.codigo,
          Estado: this.estado,
          Institucion: this.institucion,
          Tiempo: this.tiempo,
          FechaAgregacion: hoy
        }).then(()=>{
        this.spinner.hide();
        this.mensajeServicio.exito('Guardado','Curso ha sido agregado con exito');
        this.router.navigate(['/cursos']);

      }).catch(() => {
        this.spinner.hide();
        this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
        this.router.navigate(['/cursos']);

      });
    }else{
      this.spinner.hide();
      this.mensajeServicio.info('Registro Existente','Un Curso con ese codigo ha sido agregado anteriormente');
      this.router.navigate(['/cursos']);

    }


  }

  buscarCursos(){
    let curso: any;
    this.codigo = this.formularioCreado.value.Codigo;

    this.cursos.forEach( data=>{
      if(data.Codigo == this.codigo.toLowerCase() && data.Institucion == this.institucion){
        curso =data
      }
    });

    return curso;

  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Codigo: ['', Validators.compose([Validators.required])],
        Descripcion: ['', Validators.compose([Validators.required])],
        Tiempo: ['', Validators.compose([Validators.required])]
      }
    );
  }
}


