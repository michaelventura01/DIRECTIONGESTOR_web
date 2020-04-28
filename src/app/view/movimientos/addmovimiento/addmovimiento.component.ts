import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmovimiento',
  templateUrl: './addmovimiento.component.html',
  styleUrls: ['./addmovimiento.component.css']
})
export class AddmovimientoComponent implements OnInit {
  movimientos: Array<any> = new Array<any>();
  formularioCreado: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
      {
        Descripcion : ['', Validators.compose([Validators.required])],
        Tipo : ['', Validators.compose([Validators.required])],
        Monto : ['', Validators.compose([Validators.required])],
        Fecha : ['', Validators.compose([Validators.required])],
        Hora : ['', Validators.compose([Validators.required])],
        Estado: ['', Validators.compose([Validators.required])]
      }
    );
  }

  //Descripcion Tipo Monto Fecha Hora Estado

}
