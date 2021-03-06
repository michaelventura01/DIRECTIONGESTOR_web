import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent} from './view/error/error.component';
import { IngresarusuarioComponent } from './view/usuarios/ingresarusuario/ingresarusuario.component';
import { MenuComponent } from './view/common/menu/menu.component';
import { DetailsactanacimientoComponent } from './view/actasnacimientoes/detailsactanacimiento/detailsactanacimiento.component';
import { AddActaNacimientoComponent } from './view/actasnacimientoes/add-acta-nacimiento/add-acta-nacimiento.component';
import { EditActaNacimientoComponent } from './view/actasnacimientoes/edit-acta-nacimiento/edit-acta-nacimiento.component';
import { ArticulosComponent } from './view/articulos/articulos/articulos.component';
import { DetailsArticuloComponent } from './view/articulos/details/detailsArticulo.component';
import { AddArticuloComponent } from './view/articulos/add/addArticulo.component';
import { EditArticuloComponent } from './view/articulos/edit/editArticulo.component';
import { AsignaturasComponent } from './view/cursos/asignaturas/asignaturas.component';
import { AddasignaturaComponent } from './view/asignaturas/addasignatura/addasignatura.component';
import { EditasignaturaComponent } from './view/asignaturas/editasignatura/editasignatura.component';
import { DetailsasignaturaComponent } from './view/asignaturas/detailsasignatura/detailsasignatura.component';
import { AddcalificacionComponent } from './view/asignaturas/addcalificacion/addcalificacion.component';
import { AsignacionesComponent } from './view/asignaturas/asignaciones/asignaciones.component';
import { AsignarEmpleadoComponent } from './view/asignaturas/asignar-empleado/asignar-empleado.component';
import { CalificacionesComponent } from './view/asignaturas/calificaciones/calificaciones.component';
import { DetailasignacionComponent } from './view/asignaturas/detailasignacion/detailasignacion.component';
import { DetailscalificacionComponent } from './view/asignaturas/detailscalificacion/detailscalificacion.component';
// tslint:disable-next-line: max-line-length
import { DetailsinscripcionestudianteComponent } from './view/asignaturas/detailsinscripcionestudiante/detailsinscripcionestudiante.component';
import { EditasignarEmpleadoComponent } from './view/asignaturas/editasignar-empleado/editasignar-empleado.component';
import { EditarinscripcionestudianteComponent } from './view/asignaturas/editarinscripcionestudiante/editarinscripcionestudiante.component';
import { InscribirestudianteComponent } from './view/asignaturas/inscribirestudiante/inscribirestudiante.component';
import { AddcursoComponent } from './view/cursos/addcurso/addcurso.component';
import { AddcursoasignaturaComponent } from './view/cursos/addcursoasignatura/addcursoasignatura.component';
import { CursosComponent } from './view/cursos/cursos/cursos.component';
import { DetailscursoComponent } from './view/cursos/detailscurso/detailscurso.component';
import { DetailscursoasignaturaComponent } from './view/cursos/detailscursoasignatura/detailscursoasignatura.component';
import { EditcursoComponent } from './view/cursos/editcurso/editcurso.component';
import { EditcursoasignaturaComponent } from './view/cursos/editcursoasignatura/editcursoasignatura.component';
import { AddaulaComponent } from './view/edificios/addaula/addaula.component';
import { AddedificioComponent } from './view/edificios/addedificio/addedificio.component';
import { AulasComponent } from './view/edificios/aulas/aulas.component';
import { DetailedificioComponent } from './view/edificios/detailedificio/detailedificio.component';
import { DetailsaulaComponent } from './view/edificios/detailsaula/detailsaula.component';
import { EdificiosComponent } from './view/edificios/edificios/edificios.component';
import { EditaulaComponent } from './view/edificios/editaula/editaula.component';
import { EditedificioComponent } from './view/edificios/editedificio/editedificio.component';
import { AddempleadoComponent } from './view/empleados/addempleado/addempleado.component';
import { DetailsempleadoComponent } from './view/empleados/detailsempleado/detailsempleado.component';
import { EditempleadoComponent } from './view/empleados/editempleado/editempleado.component';
import { EmpleadosComponent } from './view/empleados/empleados/empleados.component';
import { AddestudianteComponent } from './view/estudiantes/addestudiante/addestudiante.component';
import { AddestudiantecursoComponent } from './view/estudiantes/addestudiantecurso/addestudiantecurso.component';
import { DetailsestudiantecursoComponent } from './view/estudiantes/detailsestudiantecurso/detailsestudiantecurso.component';
import { EditestudianteComponent } from './view/estudiantes/editestudiante/editestudiante.component';
import { EditestudiantecursoComponent } from './view/estudiantes/editestudiantecurso/editestudiantecurso.component';
import { EstudiantecursosComponent } from './view/estudiantes/estudiantecursos/estudiantecursos.component';
import { EstudiantesComponent } from './view/estudiantes/estudiantes/estudiantes.component';
import { AddinstitucionComponent } from './view/instituciones/addinstitucion/addinstitucion.component';
import { EditinstitucionComponent } from './view/instituciones/editinstitucion/editinstitucion.component';
import { CrearmensajeComponent } from './view/mensajeria/crearmensaje/crearmensaje.component';
import { DetailsmensajeComponent } from './view/mensajeria/detailsmensaje/detailsmensaje.component';
import { MensajesComponent } from './view/mensajeria/mensajes/mensajes.component';
import { MovimientosComponent } from './view/movimientos/movimientos/movimientos.component';
import { DetailsmovimientoComponent } from './view/movimientos/detailsmovimiento/detailsmovimiento.component';
import { EditmovimientoComponent } from './view/movimientos/editmovimiento/editmovimiento.component';
import { AddmovimientoComponent } from './view/movimientos/addmovimiento/addmovimiento.component';
import { AddperiodoComponent } from './view/periodos/addperiodo/addperiodo.component';
import { DetailsperiodoComponent } from './view/periodos/detailsperiodo/detailsperiodo.component';
import { EditperiodoComponent } from './view/periodos/editperiodo/editperiodo.component';
import { PeriodosComponent } from './view/periodos/periodos/periodos.component';
import { AddpersonaComponent } from './view/personas/addpersona/addpersona.component';
import { EditpersonaComponent } from './view/personas/editpersona/editpersona.component';
import { DetailspersonaComponent } from './view/personas/detailspersona/detailspersona.component';
import { PersonasComponent } from './view/personas/personas/personas.component';
import { AddtareaComponent } from './view/tareas/addtarea/addtarea.component';
import { EdittareaComponent } from './view/tareas/edittarea/edittarea.component';
import { DetailstareaComponent } from './view/tareas/detailstarea/detailstarea.component';
import { TareasComponent } from './view/tareas/tareas/tareas.component';
import { AddusuarioComponent } from './view/usuarios/addusuario/addusuario.component';
import { DetailsusuarioComponent } from './view/usuarios/detailsusuario/detailsusuario.component';
import { EditusuarioComponent } from './view/usuarios/editusuario/editusuario.component';
import { UsuariosComponent } from './view/usuarios/usuarios/usuarios.component';
import { DetailsinstitucionComponent } from './view/instituciones/detailsinstitucion/detailsinstitucion.component';
import { CuentasComponent } from './view/cuentas/cuentas/cuentas.component';
import { AddcuentaComponent } from './view/cuentas/addcuenta/addcuenta.component';
import { DetailscuentaComponent } from './view/cuentas/detailscuenta/detailscuenta.component';
import { EditcuentaComponent } from './view/cuentas/editcuenta/editcuenta.component';
import { EditcalificacionComponent } from './view/asignaturas/editcalificacion/editcalificacion.component';
import { InscripcionesestudiantesComponent } from './view/asignaturas/inscripcionesestudiantes/inscripcionesestudiantes.component';
import { CursoasignaturasComponent } from './view/cursos/cursoasignaturas/cursoasignaturas.component';
import { DetailestudianteComponent } from './view/estudiantes/detailestudiante/detailestudiante.component';
import { InicioComponentComponent } from './view/inicio-component/inicio-component.component';
import { AdddocumentoComponent } from './view/personas/adddocumento/adddocumento.component';
import { AddreacionComponent } from './view/personas/addrelacion/addreacion.component';
import { DetaildocumentoComponent } from './view/personas/detaildocumento/detaildocumento.component';
import { DetailreacionComponent } from './view/personas/detailrelacion/detailreacion.component';
import { EditdocumentoComponent } from './view/personas/editdocumento/editdocumento.component';
import { EditreacionComponent } from './view/personas/editrelacion/editreacion.component';


const routes: Routes = [
  {path: '', component: InicioComponentComponent },
  {path: 'login', component: IngresarusuarioComponent},
  {path: 'menu', component: MenuComponent },
  {path: 'documentoAgregar/:persona', component: AdddocumentoComponent},
  {path: 'relacionAgregar/:persona', component:  AddreacionComponent},
  {path: 'documentoDetalle/:id', component: DetaildocumentoComponent},
  {path: 'relacionDetalle/:id', component: DetailreacionComponent},
  {path: 'documentoEditar/:id', component: EditdocumentoComponent},
  {path: 'relacionEditar/:id', component: EditreacionComponent},
  {path: 'actanacimientoDetalle/:id', component: DetailsactanacimientoComponent },
  {path: 'actanacimientoAgregar/:persona', component: AddActaNacimientoComponent },
  {path: 'actanacimientoEditar/:id', component: EditActaNacimientoComponent },
  {path: 'articulos', component: ArticulosComponent },
  {path: 'articuloDetalle/:id', component: DetailsArticuloComponent },
  {path: 'articuloAgregar', component: AddArticuloComponent },
  {path: 'articuloEditar/:id', component: EditArticuloComponent },
  {path: 'asignaturas', component: AsignaturasComponent },
  {path: 'asignaturaAgregar', component: AddasignaturaComponent },
  {path: 'asignaturaEditar/:id', component: EditasignaturaComponent },
  {path: 'asignaturaDetalle/:id', component: DetailsasignaturaComponent },
  {path: 'asignaturaCalificar', component: AddcalificacionComponent },
  {path: 'asignaciones', component: AsignacionesComponent },
  {path: 'empleadoAsignar', component: AsignarEmpleadoComponent },
  {path: 'calificaciones', component: CalificacionesComponent },
  {path: 'asignacionDetalle/:id', component: DetailasignacionComponent },
  {path: 'calificacionAgregar', component: AddcalificacionComponent },
  {path: 'calificacionDetalle/:id', component: DetailscalificacionComponent },
  {path: 'calificacionEditar/:id', component: EditcalificacionComponent },
  {path: 'inscripcionDetalle/:id', component: DetailsinscripcionestudianteComponent },
  {path: 'inscripcionEditar/:id', component: EditarinscripcionestudianteComponent },
  {path: 'asignacionEditar/:id', component: EditasignarEmpleadoComponent },
  {path: 'inscripcionAgregar', component: InscribirestudianteComponent },
  {path: 'inscripciones', component: InscripcionesestudiantesComponent },
  {path: 'cursoAgregar', component: AddcursoComponent },
  {path: 'cursoAsignaturaAgregar', component: AddcursoasignaturaComponent },
  {path: 'asignaturas', component: AsignaturasComponent },
  {path: 'asignaturaCursos', component: CursoasignaturasComponent },
  {path: 'cursos', component: CursosComponent },
  {path: 'cursoDetalle/:id', component: DetailscursoComponent },
  {path: 'cursoAsignaturaDetalle/:id', component: DetailscursoasignaturaComponent },
  {path: 'cursoEditar/:id', component: EditcursoComponent },
  {path: 'cursoAsignaturaEditar/:id', component: EditcursoasignaturaComponent },
  {path: 'cuentas', component: CuentasComponent },
  {path: 'cuentaAgregar', component: AddcuentaComponent },
  {path: 'cuentaDetalle/:id', component: DetailscuentaComponent },
  {path: 'cuentaEditar/:id', component: EditcuentaComponent },
  {path: 'aulaAgregar', component: AddaulaComponent },
  {path: 'edificioAgregar', component: AddedificioComponent },
  {path: 'aulas', component: AulasComponent },
  {path: 'edificioDetalle/:id', component: DetailedificioComponent },
  {path: 'aulaDetalle/:id', component: DetailsaulaComponent },
  {path: 'edificios', component: EdificiosComponent },
  {path: 'aulaEditar/:id', component: EditaulaComponent },
  {path: 'edificioEditar/:id', component: EditedificioComponent },
  {path: 'empleadoAgregar', component: AddempleadoComponent },
  {path: 'empleadoDetalle/:id', component: DetailsempleadoComponent },
  {path: 'empleadoEditar/:id', component: EditempleadoComponent },
  {path: 'empleados', component: EmpleadosComponent },
  {path: 'estudianteAgregar', component: AddestudianteComponent },
  {path: 'estudianteCursoAgregar', component: AddestudiantecursoComponent },
  {path: 'estudianteCursoDetalle/:id', component: DetailsestudiantecursoComponent },
  {path: 'estudianteEditar/:id', component: EditestudianteComponent },
  {path: 'estudianteDetalle/:id', component: DetailestudianteComponent },
  {path: 'estudianteCursoEditar/:id', component: EditestudiantecursoComponent },
  {path: 'estudianteCursos', component: EstudiantecursosComponent },
  {path: 'estudiantes', component: EstudiantesComponent },
  {path: 'institucionAgregar', component: AddinstitucionComponent },
  {path: 'institucionEditar/:id', component: EditinstitucionComponent },
  {path: 'institucionDetalle/:id', component: DetailsinstitucionComponent },
  {path: 'detalleMensaje/:id', component: DetailsmensajeComponent },
  {path: 'mensajeAgregar', component: CrearmensajeComponent },
  {path: 'mensajes', component: MensajesComponent },
  {path: 'movimientos', component: MovimientosComponent },
  {path: 'movimientoDetalle/:id', component: DetailsmovimientoComponent },
  {path: 'movimientoEditar/:id', component: EditmovimientoComponent },
  {path: 'movimientoAgregar', component: AddmovimientoComponent },
  {path: 'periodoAgregar', component: AddperiodoComponent },
  {path: 'periodoDetalle/:id', component: DetailsperiodoComponent },
  {path: 'periodoEditar/:id', component: EditperiodoComponent },
  {path: 'periodos', component: PeriodosComponent },
  {path: 'personaAgregar', component: AddpersonaComponent },
  {path: 'personaEditar/:id', component: EditpersonaComponent },
  {path: 'personaDetalle/:id', component: DetailspersonaComponent },
  {path: 'personas', component: PersonasComponent },
  {path: 'tareaAgregar', component: AddtareaComponent },
  {path: 'tareaEditar/:id', component: EdittareaComponent },
  {path: 'tareaDetalle/:id', component: DetailstareaComponent },
  {path: 'tareas', component: TareasComponent },
  {path: 'usuarioAgregar', component: AddusuarioComponent },
  {path: 'usuarioDetalle/:id', component: DetailsusuarioComponent },
  {path: 'usuarioEditar/:id', component: EditusuarioComponent },
  {path: 'usuarios', component: UsuariosComponent },
  {path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
