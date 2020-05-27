import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './view/error/error.component';
import { ArticulosComponent } from './VIEW/articulos/articulos/articulos.component';
import { AsignarEmpleadoComponent } from './VIEW/asignaturas/asignar-empleado/asignar-empleado.component';
import { EditasignarEmpleadoComponent } from './VIEW/asignaturas/editasignar-empleado/editasignar-empleado.component';
import { AsignacionesComponent } from './VIEW/asignaturas/asignaciones/asignaciones.component';
import { DetailasignacionComponent } from './VIEW/asignaturas/detailasignacion/detailasignacion.component';
import { InscribirestudianteComponent } from './VIEW/asignaturas/inscribirestudiante/inscribirestudiante.component';
import { EditarinscripcionestudianteComponent } from './VIEW/asignaturas/editarinscripcionestudiante/editarinscripcionestudiante.component';
// tslint:disable-next-line: max-line-length
import { DetailsinscripcionestudianteComponent } from './VIEW/asignaturas/detailsinscripcionestudiante/detailsinscripcionestudiante.component';
import { AddaulaComponent } from './VIEW/edificios/addaula/addaula.component';
import { EditaulaComponent } from './VIEW/edificios/editaula/editaula.component';
import { DetailsaulaComponent } from './VIEW/edificios/detailsaula/detailsaula.component';
import { AulasComponent } from './VIEW/edificios/aulas/aulas.component';
import { AddedificioComponent } from './VIEW/edificios/addedificio/addedificio.component';
import { EditedificioComponent } from './VIEW/edificios/editedificio/editedificio.component';
import { EdificiosComponent } from './VIEW/edificios/edificios/edificios.component';
import { DetailedificioComponent } from './VIEW/edificios/detailedificio/detailedificio.component';
import { AddasignaturaComponent } from './VIEW/asignaturas/addasignatura/addasignatura.component';
import { EditasignaturaComponent } from './VIEW/asignaturas/editasignatura/editasignatura.component';
import { DetailsasignaturaComponent } from './VIEW/asignaturas/detailsasignatura/detailsasignatura.component';
import { AddcalificacionComponent } from './VIEW/asignaturas/addcalificacion/addcalificacion.component';
import { EditcalificacionComponent } from './VIEW/asignaturas/editcalificacion/editcalificacion.component';
import { DetailscalificacionComponent } from './VIEW/asignaturas/detailscalificacion/detailscalificacion.component';
import { CalificacionesComponent } from './VIEW/asignaturas/calificaciones/calificaciones.component';
import { AddcuentaComponent } from './VIEW/cuentas/addcuenta/addcuenta.component';
import { EditcuentaComponent } from './VIEW/cuentas/editcuenta/editcuenta.component';
import { DetailscuentaComponent } from './VIEW/cuentas/detailscuenta/detailscuenta.component';
import { CuentasComponent } from './VIEW/cuentas/cuentas/cuentas.component';
import { AddcursoComponent } from './VIEW/cursos/addcurso/addcurso.component';
import { EditcursoComponent } from './VIEW/cursos/editcurso/editcurso.component';
import { DetailscursoComponent } from './VIEW/cursos/detailscurso/detailscurso.component';
import { CursosComponent } from './VIEW/cursos/cursos/cursos.component';
import { AddcursoasignaturaComponent } from './VIEW/cursos/addcursoasignatura/addcursoasignatura.component';
import { EditcursoasignaturaComponent } from './VIEW/cursos/editcursoasignatura/editcursoasignatura.component';
import { DetailscursoasignaturaComponent } from './VIEW/cursos/detailscursoasignatura/detailscursoasignatura.component';
import { AsignaturasComponent } from './VIEW/cursos/asignaturas/asignaturas.component';
import { AddempleadoComponent } from './VIEW/empleados/addempleado/addempleado.component';
import { EditempleadoComponent } from './VIEW/empleados/editempleado/editempleado.component';
import { DetailsempleadoComponent } from './VIEW/empleados/detailsempleado/detailsempleado.component';
import { EmpleadosComponent } from './VIEW/empleados/empleados/empleados.component';
import { EstudiantesComponent } from './VIEW/estudiantes/estudiantes/estudiantes.component';
import { AddestudianteComponent } from './VIEW/estudiantes/addestudiante/addestudiante.component';
import { EditestudianteComponent } from './VIEW/estudiantes/editestudiante/editestudiante.component';
import { AddestudiantecursoComponent } from './VIEW/estudiantes/addestudiantecurso/addestudiantecurso.component';
import { EditestudiantecursoComponent } from './VIEW/estudiantes/editestudiantecurso/editestudiantecurso.component';
import { DetailsestudiantecursoComponent } from './VIEW/estudiantes/detailsestudiantecurso/detailsestudiantecurso.component';
import { EstudiantecursosComponent } from './VIEW/estudiantes/estudiantecursos/estudiantecursos.component';
import { AddusuarioComponent } from './VIEW/usuarios/addusuario/addusuario.component';
import { EditusuarioComponent } from './VIEW/usuarios/editusuario/editusuario.component';
import { DetailsusuarioComponent } from './VIEW/usuarios/detailsusuario/detailsusuario.component';
import { IngresarusuarioComponent } from './VIEW/usuarios/ingresarusuario/ingresarusuario.component';
import { UsuariosComponent } from './VIEW/usuarios/usuarios/usuarios.component';
import { AddperiodoComponent } from './VIEW/periodos/addperiodo/addperiodo.component';
import { EditperiodoComponent } from './VIEW/periodos/editperiodo/editperiodo.component';
import { PeriodosComponent } from './VIEW/periodos/periodos/periodos.component';
import { DetailsperiodoComponent } from './VIEW/periodos/detailsperiodo/detailsperiodo.component';
import { AddmovimientoComponent } from './VIEW/movimientos/addmovimiento/addmovimiento.component';
import { EditmovimientoComponent } from './VIEW/movimientos/editmovimiento/editmovimiento.component';
import { MovimientosComponent } from './VIEW/movimientos/movimientos/movimientos.component';
import { DetailsmovimientoComponent } from './VIEW/movimientos/detailsmovimiento/detailsmovimiento.component';
import { AddinstitucionComponent } from './VIEW/instituciones/addinstitucion/addinstitucion.component';
import { EditinstitucionComponent } from './VIEW/instituciones/editinstitucion/editinstitucion.component';
import { DetailsinstitucionComponent } from './VIEW/instituciones/detailsinstitucion/detailsinstitucion.component';
import { CrearmensajeComponent } from './VIEW/mensajeria/crearmensaje/crearmensaje.component';
import { DetailsmensajeComponent } from './VIEW/mensajeria/detailsmensaje/detailsmensaje.component';
import { MensajesComponent } from './VIEW/mensajeria/mensajes/mensajes.component';
import { MenuComponent } from './VIEW/common/menu/menu.component';
import { TareasComponent } from './view/tareas/tareas/tareas.component';
import { AddtareaComponent } from './view/tareas/addtarea/addtarea.component';
import { EdittareaComponent } from './view/tareas/edittarea/edittarea.component';
import { DetailstareaComponent } from './view/tareas/detailstarea/detailstarea.component';
import { FooterComponent } from './view/common/footer/footer.component';
import { HeaderComponent } from './view/common/header/header.component';
import { AddpersonaComponent } from './view/personas/addpersona/addpersona.component';
import { EditpersonaComponent } from './view/personas/editpersona/editpersona.component';
import { DetailspersonaComponent } from './view/personas/detailspersona/detailspersona.component';
import { PersonasComponent } from './view/personas/personas/personas.component';
import { AddActaNacimientoComponent } from './view/actasnacimientoes/add-acta-nacimiento/add-acta-nacimiento.component';
import { EditActaNacimientoComponent } from './view/actasnacimientoes/edit-acta-nacimiento/edit-acta-nacimiento.component';
import { DetailsactanacimientoComponent } from './view/actasnacimientoes/detailsactanacimiento/detailsactanacimiento.component';
import {AddArticuloComponent} from './view/articulos/add/addArticulo.component';
import {EditArticuloComponent} from './view/articulos/edit/editArticulo.component';
import {DetailsArticuloComponent} from './view/articulos/details/detailsArticulo.component';
import { ActanacimientoService } from './services/actanacimiento.service';
import { ArticuloService } from './services/articulo.service';
import { AsignaturaService } from './services/asignatura.service';
import { CuentaService } from './services/cuenta.service';
import { CursoService } from './services/curso.service';
import { EdificioService } from './services/edificio.service';
import { EmpleadoService } from './services/empleado.service';
import { EstudianteService } from './services/estudiante.service';
import { InstitucionService } from './services/institucion.service';
import { MensajeService } from './services/mensaje.service';
import { MenuService } from './services/menu.service';
import { MovimientoService } from './services/movimiento.service';
import { PeriodoService } from './services/periodo.service';
import { PersonaService } from './services/persona.service';
import { TareaService } from './services/tarea.service';
import { UsuarioService } from './services/usuario.service';
import { InscripcionesestudiantesComponent } from './view/asignaturas/inscripcionesestudiantes/inscripcionesestudiantes.component';
import { CursoasignaturasComponent } from './view/cursos/cursoasignaturas/cursoasignaturas.component';
import { DetailestudianteComponent } from './view/estudiantes/detailestudiante/detailestudiante.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponentComponent } from './view/inicio-component/inicio-component.component';
import { AdddocumentoComponent } from './view/personas/adddocumento/adddocumento.component';
import { AddreacionComponent } from './view/personas/addrelacion/addreacion.component';
import { DetaildocumentoComponent } from './view/personas/detaildocumento/detaildocumento.component';
import { DetailreacionComponent } from './view/personas/detailrelacion/detailreacion.component';
import { EditdocumentoComponent } from './view/personas/editdocumento/editdocumento.component';
import { EditreacionComponent } from './view/personas/editrelacion/editreacion.component';
import { TelPipe } from './pipes/tel.pipe';
import * as jsPDF from 'jspdf';
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AddArticuloComponent,
    EditArticuloComponent,
    DetailsArticuloComponent,
    ArticulosComponent,
    AsignarEmpleadoComponent,
    EditasignarEmpleadoComponent,
    AsignacionesComponent,
    DetailasignacionComponent,
    InscribirestudianteComponent,
    EditarinscripcionestudianteComponent,
    DetailsinscripcionestudianteComponent,
    AddaulaComponent,
    EditaulaComponent,
    DetailsaulaComponent,
    AulasComponent,
    AddedificioComponent,
    EditedificioComponent,
    EdificiosComponent,
    DetailedificioComponent,
    AddasignaturaComponent,
    EditasignaturaComponent,
    DetailsasignaturaComponent,
    AddcalificacionComponent,
    EditcalificacionComponent,
    DetailscalificacionComponent,
    CalificacionesComponent,
    AddcuentaComponent,
    EditcuentaComponent,
    DetailscuentaComponent,
    CuentasComponent,
    AddcursoComponent,
    EditcursoComponent,
    DetailscursoComponent,
    CursosComponent,
    AddcursoasignaturaComponent,
    EditcursoasignaturaComponent,
    DetailscursoasignaturaComponent,
    AsignaturasComponent,
    AddempleadoComponent,
    EditempleadoComponent,
    DetailsempleadoComponent,
    EmpleadosComponent,
    EstudiantesComponent,
    AddestudianteComponent,
    EditestudianteComponent,
    AddestudiantecursoComponent,
    EditestudiantecursoComponent,
    DetailsestudiantecursoComponent,
    EstudiantecursosComponent,
    AddusuarioComponent,
    EditusuarioComponent,
    DetailsusuarioComponent,
    IngresarusuarioComponent,
    UsuariosComponent,
    AddperiodoComponent,
    EditperiodoComponent,
    PeriodosComponent,
    DetailsperiodoComponent,
    AddmovimientoComponent,
    EditmovimientoComponent,
    MovimientosComponent,
    DetailsmovimientoComponent,
    AddinstitucionComponent,
    EditinstitucionComponent,
    DetailsinstitucionComponent,
    CrearmensajeComponent,
    DetailsmensajeComponent,
    MensajesComponent,
    MenuComponent,
    TareasComponent,
    AddtareaComponent,
    EdittareaComponent,
    DetailstareaComponent,
    FooterComponent,
    HeaderComponent,
    AddpersonaComponent,
    EditpersonaComponent,
    DetailspersonaComponent,
    PersonasComponent,
    AddActaNacimientoComponent,
    EditActaNacimientoComponent,
    DetailsactanacimientoComponent,
    InscripcionesestudiantesComponent,
    CursoasignaturasComponent,
    DetailestudianteComponent,
    InicioComponentComponent,
    AdddocumentoComponent,
    AddreacionComponent,
    DetaildocumentoComponent,
    DetailreacionComponent,
    EditdocumentoComponent,
    EditreacionComponent,
    TelPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFontAwesomeModule,
    ProgressbarModule.forRoot()
  ],
  providers: [
    ActanacimientoService,
    ArticuloService,
    AsignaturaService,
    CuentaService,
    CursoService,
    EdificioService,
    EmpleadoService,
    EstudianteService,
    InstitucionService,
    MensajeService,
    MenuService,
    MovimientoService,
    PeriodoService,
    PersonaService,
    TareaService,
    UsuarioService,
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
