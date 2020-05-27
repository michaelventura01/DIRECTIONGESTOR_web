import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildocumentoComponent } from './detaildocumento.component';

describe('DetaildocumentoComponent', () => {
  let component: DetaildocumentoComponent;
  let fixture: ComponentFixture<DetaildocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
