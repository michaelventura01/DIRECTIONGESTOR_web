import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditasignarEmpleadoComponent } from './editasignar-empleado.component';

describe('EditasignarEmpleadoComponent', () => {
  let component: EditasignarEmpleadoComponent;
  let fixture: ComponentFixture<EditasignarEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditasignarEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditasignarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
