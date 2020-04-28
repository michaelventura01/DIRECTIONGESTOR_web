import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinstitucionComponent } from './editinstitucion.component';

describe('EditinstitucionComponent', () => {
  let component: EditinstitucionComponent;
  let fixture: ComponentFixture<EditinstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
