import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonaService } from 'src/app/services/persona.service';
import { InstitucionService } from 'src/app/services/institucion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  institucion: string;
  esMostrar: boolean;

  constructor(
    ) { }

  ngOnInit() {
    this.institucion = localStorage.getItem('tituloFooter');
    if (localStorage.getItem('tituloFooter')){
      this.esMostrar = true;
    } else {
      this.esMostrar = false;
    }

  }


}
