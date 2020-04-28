import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscursoComponent } from './detailscurso.component';

describe('DetailscursoComponent', () => {
  let component: DetailscursoComponent;
  let fixture: ComponentFixture<DetailscursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
