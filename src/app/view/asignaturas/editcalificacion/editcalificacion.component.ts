
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editcalificacion',
  templateUrl: './editcalificacion.component.html',
  styleUrls: ['./editcalificacion.component.css']
})
export class EditcalificacionComponent implements OnInit {
  asignaturas: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  estudiantes: Array<any> = new Array<any>();
  empleados: Array<any>= new Array<any>();
  formularioCreado: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Periodo:['',Validators.compose([Validators.required])],
        Fecha:['',Validators.compose([Validators.required])],
        Calificacion:['',Validators.compose([Validators.required])],
        Estudiante:['',Validators.compose([Validators.required])],
        Profesor:['',Validators.compose([Validators.required])],
        Asignatura:['',Validators.compose([Validators.required])],
        Estado:['',Validators.compose([Validators.required])]
      }
    );

  }

  agregar( )
  {

  }

}
