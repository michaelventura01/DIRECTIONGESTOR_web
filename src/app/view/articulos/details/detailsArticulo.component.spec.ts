import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArticuloComponent } from './detailsArticulo.component';

describe('DetailsComponent', () => {
  let component: DetailsArticuloComponent;
  let fixture: ComponentFixture<DetailsArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
