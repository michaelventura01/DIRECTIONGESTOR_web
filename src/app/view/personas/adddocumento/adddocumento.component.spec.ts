import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocumentoComponent } from './adddocumento.component';

describe('AdddocumentoComponent', () => {
  let component: AdddocumentoComponent;
  let fixture: ComponentFixture<AdddocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
