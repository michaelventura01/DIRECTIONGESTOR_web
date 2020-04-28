import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-acta-nacimiento',
  templateUrl: './edit-acta-nacimiento.component.html',
  styleUrls: ['./edit-acta-nacimiento.component.css']
})
export class EditActaNacimientoComponent implements OnInit {

  actaNacimientos: Array<any> = new Array<any>();
  formularioCreado: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group(
    {
      Folio: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6)
      ])],
      Anio: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])],
      Numero: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6)
      ])],
      Libro: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(7)
      ])],
      Circunscripcion: ['', Validators.required]
      }
    );
  }

  agregar(){
  }

}
