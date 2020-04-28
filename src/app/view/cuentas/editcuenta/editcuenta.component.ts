import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editcuenta',
  templateUrl: './editcuenta.component.html',
  styleUrls: ['./editcuenta.component.css']
})
export class EditcuentaComponent implements OnInit {
  cuentas: Array<any> = new Array<any>();
  formularioCreado: FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Tipo: ['', Validators.compose([Validators.required])],
        Descripcion: ['', Validators.compose([Validators.required])],
        Monto: ['', Validators.compose([Validators.required])],
        Fecha: ['', Validators.compose([Validators.required])],
        Persona: ['', Validators.compose([Validators.required])],
        Estado: ['', Validators.compose([Validators.required])]
      }
    );
    //buscarPersona
  }


}

