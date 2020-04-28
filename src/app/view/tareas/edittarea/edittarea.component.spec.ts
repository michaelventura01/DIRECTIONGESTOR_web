import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittareaComponent } from './edittarea.component';

describe('EdittareaComponent', () => {
  let component: EdittareaComponent;
  let fixture: ComponentFixture<EdittareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
