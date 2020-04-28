import { Injectable } from '@angular/core';
import {timer, Observable, Subject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// tslint:disable-next-line: class-name
export class Tiempo {
  horA: number;
  minutO: string;
  segundO: string;
  meridianO: string;
  diaSemanA: string;
  diaMeS: string;
}
export class MenuService {
  reloj: Observable <Date>;
  fecha$ = new Subject<Tiempo>();
  tiempo: Tiempo;
  meridiano: string;
  hora: number;
  minuto: string;
  diaSemana: string;
  mes: string;
  año: string;

  constructor() {
    this.reloj = timer(0, 1000).pipe(map(t => new Date()), shareReplay(1));
   }

   getInfoReloj(): Observable<Tiempo> {
    this.reloj.subscribe(t => {
     this.hora = t.getHours() % 12;
     this.hora = this.hora ? this.hora : 12;
     this.tiempo = {
      horA: this.hora,
      minutO: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
      meridianO: t.getHours() > 11 ? 'PM' : 'AM',
      diaMeS: t.toLocaleString('es-MX', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' '),
      diaSemanA: t.toLocaleString('es-MX', { weekday: 'long' }).replace('.', ''),
      segundO: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()

      };
     this.fecha$.next(this.tiempo);
    });
    return this.fecha$.asObservable();

  }
}
