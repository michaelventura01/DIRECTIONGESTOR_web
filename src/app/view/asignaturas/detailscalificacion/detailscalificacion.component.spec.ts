import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscalificacionComponent } from './detailscalificacion.component';

describe('DetailscalificacionComponent', () => {
  let component: DetailscalificacionComponent;
  let fixture: ComponentFixture<DetailscalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
