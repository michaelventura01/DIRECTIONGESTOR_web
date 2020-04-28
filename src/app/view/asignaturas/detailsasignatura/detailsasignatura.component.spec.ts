import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsasignaturaComponent } from './detailsasignatura.component';

describe('DetailsasignaturaComponent', () => {
  let component: DetailsasignaturaComponent;
  let fixture: ComponentFixture<DetailsasignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsasignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsasignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
