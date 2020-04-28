import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-acta-nacimiento',
  templateUrl: './add-acta-nacimiento.component.html',
  styleUrls: ['./add-acta-nacimiento.component.css']
})
export class AddActaNacimientoComponent implements OnInit {
  actaNacimiento: Array<any> = new Array<any>();
  formularioCreado: FormGroup;

  constructor(private formBuilder: FormBuilder ) { }

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

  agregar( )
  {
  }
}
