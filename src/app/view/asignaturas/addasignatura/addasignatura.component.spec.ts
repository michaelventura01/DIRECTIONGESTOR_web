import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddasignaturaComponent } from './addasignatura.component';

describe('AddasignaturaComponent', () => {
  let component: AddasignaturaComponent;
  let fixture: ComponentFixture<AddasignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddasignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddasignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
