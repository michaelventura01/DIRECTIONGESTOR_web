import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusuarioComponent } from './editusuario.component';

describe('EditusuarioComponent', () => {
  let component: EditusuarioComponent;
  let fixture: ComponentFixture<EditusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
