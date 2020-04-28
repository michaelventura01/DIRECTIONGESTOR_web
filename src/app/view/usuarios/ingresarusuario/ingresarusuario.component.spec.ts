import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarusuarioComponent } from './ingresarusuario.component';

describe('IngresarusuarioComponent', () => {
  let component: IngresarusuarioComponent;
  let fixture: ComponentFixture<IngresarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
