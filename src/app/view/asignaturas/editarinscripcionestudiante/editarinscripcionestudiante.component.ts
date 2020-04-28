import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editarinscripcionestudiante',
  templateUrl: './editarinscripcionestudiante.component.html',
  styleUrls: ['./editarinscripcionestudiante.component.css']
})
export class EditarinscripcionestudianteComponent implements OnInit {
  estudiantes: Array<any> = new Array<any>();
  profesores: Array<any> = new Array<any>();
  asignaturas: Array<any> = new Array<any>();
  formularioCreado: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Estudiante: ['', Validators.compose([Validators.required])],
        Profesor: ['', Validators.compose([Validators.required])],
        Periodo: ['', Validators.compose([Validators.required])],
        Asignatura: ['', Validators.compose([Validators.required])],
        Estado: ['', Validators.compose([Validators.required])]
      }
    );
  }
}
