import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcuentaComponent } from './editcuenta.component';

describe('EditcuentaComponent', () => {
  let component: EditcuentaComponent;
  let fixture: ComponentFixture<EditcuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
