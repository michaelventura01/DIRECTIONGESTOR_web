import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DirectionGestor';
  page = 'unkonwn page';
  cores = [{nombre: 'rojo', faculty: 'brillante'},{nombre:'azul', faculty:'suave'}];
}
