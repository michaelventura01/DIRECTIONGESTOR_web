import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddestudianteComponent } from './addestudiante.component';

describe('AddestudianteComponent', () => {
  let component: AddestudianteComponent;
  let fixture: ComponentFixture<AddestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
