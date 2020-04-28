import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crearmensaje',
  templateUrl: './crearmensaje.component.html',
  styleUrls: ['./crearmensaje.component.css']
})
export class CrearmensajeComponent implements OnInit {
  mensajes: Array<any> = new Array<any>();
  personas: Array<any> = new Array<any>();
  formularioCreado: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Descripcion:['',Validators.compose([Validators.required])],
      Titulo:['',Validators.compose([Validators.required])],
      Receptor:['',Validators.compose([Validators.required])]
    }
  )
}
}
