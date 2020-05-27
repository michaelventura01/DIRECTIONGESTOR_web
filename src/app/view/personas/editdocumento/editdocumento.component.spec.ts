import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdocumentoComponent } from './editdocumento.component';

describe('EditdocumentoComponent', () => {
  let component: EditdocumentoComponent;
  let fixture: ComponentFixture<EditdocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
