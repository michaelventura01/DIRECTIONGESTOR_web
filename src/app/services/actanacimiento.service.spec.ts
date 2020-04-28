import { TestBed } from '@angular/core/testing';

import { ActanacimientoService } from './actanacimiento.service';

describe('ActanacimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActanacimientoService = TestBed.get(ActanacimientoService);
    expect(service).toBeTruthy();
  });
});
