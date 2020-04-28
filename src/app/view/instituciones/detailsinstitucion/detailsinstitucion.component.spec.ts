import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsinstitucionComponent } from './detailsinstitucion.component';

describe('DetailsinstitucionComponent', () => {
  let component: DetailsinstitucionComponent;
  let fixture: ComponentFixture<DetailsinstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsinstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsinstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
