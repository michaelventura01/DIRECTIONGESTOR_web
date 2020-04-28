import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdificioService } from 'src/app/services/edificio.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addaula',
  templateUrl: './addaula.component.html',
  styleUrls: ['./addaula.component.css']
})
export class AddaulaComponent implements OnInit {
  edificios: Array<any> = new Array<any>();
  formularioAula: FormGroup;
  institucion: string;
  constructor(
    private formBuilder: FormBuilder,
    private edificioServicio: EdificioService,
    private database: AngularFirestore,
    private mensajeServicio: MensajeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.crearFormulario();
    this.edificios = this.edificioServicio.verEdificios();
    this.institucion = localStorage.getItem('instituto');
  }

  agregarAula(){
    this.database.collection('aulas').add(
      {
        Descripcion:this.formularioAula.value.Aula,
        Edificio: this.formularioAula.value.Edificio,
        Estado: '01',
        Institucion:this.institucion
      }).then(()=>{
      this.mensajeServicio.exito('Guardado','Aula ha sido agregada con exito');
      this.router.navigate(['/aulas']);

    }).catch(() => {
      this.mensajeServicio.error('Error','Ha ocurrido un error no esperado');
      this.router.navigate(['/aulas']);

    });
  }

  tenerEdificios(){
    let edificios : Array<any> = new Array<any>();
    this.edificios.forEach(data=>{
      if(data.Estado == '01'){
        edificios.push(data);
      }

    });
    return edificios;
  }

  crearFormulario(){
    this.formularioAula = this.formBuilder.group({
      Aula:['', Validators.compose([Validators.required])],
      Edificio:['', Validators.compose([Validators.required])]
    });

  }


}
