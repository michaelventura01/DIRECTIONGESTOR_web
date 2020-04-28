import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinstitucionComponent } from './addinstitucion.component';

describe('AddinstitucionComponent', () => {
  let component: AddinstitucionComponent;
  let fixture: ComponentFixture<AddinstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
