import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscuentaComponent } from './detailscuenta.component';

describe('DetailscuentaComponent', () => {
  let component: DetailscuentaComponent;
  let fixture: ComponentFixture<DetailscuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
