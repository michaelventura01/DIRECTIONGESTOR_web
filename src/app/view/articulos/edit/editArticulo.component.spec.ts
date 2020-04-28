import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticuloComponent } from './editArticulo.component';

describe('EditComponent', () => {
  let component: EditArticuloComponent;
  let fixture: ComponentFixture<EditArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
