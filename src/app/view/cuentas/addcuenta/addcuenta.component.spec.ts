import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcuentaComponent } from './addcuenta.component';

describe('AddcuentaComponent', () => {
  let component: AddcuentaComponent;
  let fixture: ComponentFixture<AddcuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
