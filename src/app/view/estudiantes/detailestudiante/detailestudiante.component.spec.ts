import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailestudianteComponent } from './detailestudiante.component';

describe('DetailestudianteComponent', () => {
  let component: DetailestudianteComponent;
  let fixture: ComponentFixture<DetailestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
