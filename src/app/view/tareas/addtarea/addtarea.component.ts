import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addtarea',
  templateUrl: './addtarea.component.html',
  styleUrls: ['./addtarea.component.css']
})
export class AddtareaComponent implements OnInit {
  tarea: Array<any> = new Array<any>();
  formularioCreado: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Titulo: ['', Validators.compose([Validators.required])],
      Descripcion: ['', Validators.compose([Validators.required])],
      Estado: ['', Validators.compose([Validators.required])],
      Prioridad: ['', Validators.compose([Validators.required])],
      Hora : ['', Validators.compose([Validators.required])],
      Fecha : ['', Validators.compose([Validators.required])]

    });

  //

}
}
