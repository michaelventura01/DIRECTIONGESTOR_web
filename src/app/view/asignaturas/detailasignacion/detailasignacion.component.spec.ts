import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailasignacionComponent } from './detailasignacion.component';

describe('DetailasignacionComponent', () => {
  let component: DetailasignacionComponent;
  let fixture: ComponentFixture<DetailasignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailasignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
