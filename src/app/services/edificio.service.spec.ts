import { TestBed } from '@angular/core/testing';

import { EdificioService } from './edificio.service';

describe('EdificioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdificioService = TestBed.get(EdificioService);
    expect(service).toBeTruthy();
  });
});
