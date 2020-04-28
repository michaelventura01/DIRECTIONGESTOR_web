import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmovimientoComponent } from './editmovimiento.component';

describe('EditmovimientoComponent', () => {
  let component: EditmovimientoComponent;
  let fixture: ComponentFixture<EditmovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
